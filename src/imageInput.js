import { readFileSync } from "node:fs";
import path from "node:path";

const MIME_BY_EXT = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

export function resolveImageInput(imageRef, baseDir = ".") {
  if (/^https?:\/\//i.test(imageRef) || imageRef.startsWith("data:")) {
    return imageRef;
  }
  const fullPath = path.resolve(baseDir, imageRef);
  const ext = path.extname(fullPath).toLowerCase();
  const mime = MIME_BY_EXT[ext];
  if (!mime) throw new Error(`Unsupported image extension: ${ext} (${fullPath})`);
  const bytes = readFileSync(fullPath);
  return `data:${mime};base64,${bytes.toString("base64")}`;
}
