#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import readline from "node:readline/promises";
import path from "node:path";

import { loadEnvFile } from "./env.js";
import { submitPrediction, pollPrediction, estimatePrice } from "./wavespeedClient.js";
import { runPool } from "./pool.js";
import { resolveImageInput } from "./imageInput.js";

const DEFAULT_MODEL = "wavespeed-ai/flux-dev";

function parseArgs(argv) {
  const args = { concurrency: 3, out: "output", download: true, dryRun: false, yes: false };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--concurrency") args.concurrency = Number(argv[++i]);
    else if (arg === "--out") args.out = argv[++i];
    else if (arg === "--model") args.model = argv[++i];
    else if (arg === "--no-download") args.download = false;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--yes" || arg === "-y") args.yes = true;
    else positional.push(arg);
  }
  args.batchFile = positional[0];
  return args;
}

function slugify(text, maxLen = 40) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, maxLen);
}

function truncate(text, maxLen = 60) {
  return text.length > maxLen ? `${text.slice(0, maxLen - 3)}...` : text;
}

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url} (HTTP ${res.status})`);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buffer);
}

async function printCostBreakdown({ model, apiKey, inputs }) {
  console.log("\nCost breakdown:");
  let total = 0;
  let currency = "USD";
  let hadErrors = false;

  for (const [index, input] of inputs.entries()) {
    const quantity = input.num_images || 1;
    try {
      const price = await estimatePrice({ model, apiKey, input });
      currency = price.currency || currency;
      const subtotal = price.unit_price * quantity;
      total += subtotal;
      console.log(
        `  [${index}] ${truncate(input.prompt || "")} — ${quantity} x $${price.unit_price} = $${subtotal.toFixed(4)}`
      );
    } catch (error) {
      hadErrors = true;
      console.log(`  [${index}] ${truncate(input.prompt || "")} — price unavailable (${error.message})`);
    }
  }

  console.log(`  ---`);
  console.log(`  Estimated total: ${total.toFixed(4)} ${currency}${hadErrors ? " (incomplete — some jobs had no price)" : ""}\n`);
  return { total, currency, hadErrors };
}

async function confirm(message) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`${message} (y/N): `);
  rl.close();
  return /^y(es)?$/i.test(answer.trim());
}

async function main() {
  loadEnvFile();
  const args = parseArgs(process.argv.slice(2));

  if (!args.batchFile) {
    console.error("Usage: node src/batchLaunch.js <batch-file.json> [--concurrency N] [--out DIR] [--model MODEL] [--no-download] [--dry-run] [--yes]");
    process.exit(1);
  }

  const apiKey = process.env.WAVESPEED_API_KEY;
  if (!apiKey && !args.dryRun) {
    console.error("Missing WAVESPEED_API_KEY (set it in .env or the environment).");
    process.exit(1);
  }

  const batch = JSON.parse(await readFile(args.batchFile, "utf8"));
  const model = args.model || batch.model || DEFAULT_MODEL;
  const defaults = { ...(batch.defaults || {}) };
  const jobs = batch.jobs || [];

  if (batch.image) {
    defaults.image = resolveImageInput(batch.image, path.dirname(args.batchFile));
  }

  if (jobs.length === 0) {
    console.error(`No jobs found in ${args.batchFile}`);
    process.exit(1);
  }

  const inputs = jobs.map((job) => ({ ...defaults, ...job }));

  console.log(`Model: ${model}`);
  console.log(`Jobs: ${jobs.length}, concurrency: ${args.concurrency}`);

  if (args.dryRun) {
    inputs.forEach((input, i) => {
      const printable = { ...input };
      if (printable.image && printable.image.length > 80) {
        printable.image = `${printable.image.slice(0, 60)}... (${printable.image.length} chars)`;
      }
      console.log(`[dry-run] job ${i}: ${JSON.stringify(printable)}`);
    });
    if (apiKey) await printCostBreakdown({ model, apiKey, inputs });
    return;
  }

  const { total, hadErrors } = await printCostBreakdown({ model, apiKey, inputs });

  if (!args.yes) {
    const proceed = await confirm(
      hadErrors
        ? "Some prices couldn't be confirmed. Proceed anyway and spend real money?"
        : `Proceed and spend approximately $${total.toFixed(4)}?`
    );
    if (!proceed) {
      console.log("Aborted — no jobs were submitted.");
      return;
    }
  }

  mkdirSync(args.out, { recursive: true });

  const startedAt = new Date().toISOString();
  const results = await runPool(jobs, args.concurrency, async (_job, index) => {
    const input = inputs[index];
    console.log(`[${index + 1}/${jobs.length}] submitting: ${input.prompt}`);
    const submitted = await submitPrediction({ model, apiKey, input });
    const completed = await pollPrediction({ id: submitted.id, apiKey });

    const files = [];
    if (args.download) {
      for (const [i, url] of (completed.outputs || []).entries()) {
        const ext = path.extname(new URL(url).pathname) || ".png";
        const filename = `${index}-${slugify(input.prompt)}${completed.outputs.length > 1 ? `-${i}` : ""}${ext}`;
        const dest = path.join(args.out, filename);
        await downloadFile(url, dest);
        files.push(dest);
      }
    }

    console.log(`[${index + 1}/${jobs.length}] completed: ${submitted.id}`);
    return {
      index,
      prompt: input.prompt,
      id: submitted.id,
      status: completed.status,
      outputs: completed.outputs || [],
      files,
    };
  });

  const manifest = {
    model,
    startedAt,
    finishedAt: new Date().toISOString(),
    results: results.map((r, i) =>
      r.ok
        ? r.value
        : { index: i, prompt: jobs[i].prompt, status: "failed", error: String(r.error.message || r.error) }
    ),
  };

  writeFileSync(path.join(args.out, "results.json"), JSON.stringify(manifest, null, 2));

  const succeeded = manifest.results.filter((r) => r.status === "completed").length;
  const failed = manifest.results.length - succeeded;
  console.log(`\nDone: ${succeeded} succeeded, ${failed} failed. Manifest: ${path.join(args.out, "results.json")}`);
  if (failed > 0) {
    for (const r of manifest.results) {
      if (r.status !== "completed") console.error(`  job ${r.index} failed: ${r.error}`);
    }
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
