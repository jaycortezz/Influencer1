const BASE_URL = "https://api.wavespeed.ai/api/v3";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function submitPrediction({ model, apiKey, input }) {
  const res = await fetch(`${BASE_URL}/${model}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(input),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || (json.code && json.code >= 400)) {
    throw new Error(
      `WaveSpeed submit failed (HTTP ${res.status}): ${json.message || JSON.stringify(json)}`
    );
  }
  return json.data;
}

export async function pollPrediction({
  id,
  apiKey,
  intervalMs = 2000,
  timeoutMs = 180000,
}) {
  const startedAt = Date.now();
  while (true) {
    const res = await fetch(`${BASE_URL}/predictions/${id}/result`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(
        `WaveSpeed poll failed (HTTP ${res.status}): ${json.message || JSON.stringify(json)}`
      );
    }
    const data = json.data;
    if (data.status === "completed") return data;
    if (data.status === "failed") {
      throw new Error(`WaveSpeed job ${id} failed: ${data.error || "unknown error"}`);
    }
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error(`WaveSpeed job ${id} timed out after ${timeoutMs}ms (last status: ${data.status})`);
    }
    await sleep(intervalMs);
  }
}
