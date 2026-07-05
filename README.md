# Influencer1

CLI for launching a batch of WaveSpeed AI image-generation jobs from a JSON file.

## Setup

```bash
cp .env.example .env
# then edit .env and set WAVESPEED_API_KEY=...
```

## Batch file format

```json
{
  "model": "wavespeed-ai/flux-dev",
  "defaults": { "size": "1024*1024", "num_inference_steps": 28, "guidance_scale": 3.5, "num_images": 1, "seed": -1 },
  "jobs": [
    { "prompt": "A majestic mountain landscape at sunset, cinematic lighting" },
    { "prompt": "A cozy coffee shop interior, warm lighting, photorealistic" }
  ]
}
```

`defaults` are merged into every job; any field can be overridden per-job (including `model`-specific params).

## Usage

```bash
# preview what would be submitted, no API calls
node src/batchLaunch.js batches/example.json --dry-run

# launch the batch (3 concurrent jobs, downloads images into ./output)
node src/batchLaunch.js batches/example.json --concurrency 3 --out output

# skip downloading images, just record the output URLs
node src/batchLaunch.js batches/example.json --no-download
```

Each run writes `output/results.json` with per-job status, output URLs, and downloaded file paths.

## Notes

- Requires Node.js 18+ (uses the built-in `fetch`).
- `WAVESPEED_API_KEY` is read from `.env` (gitignored) or the environment — never hardcode it.
