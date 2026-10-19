import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared look for the link-preview images (opengraph-image.tsx files).
export const ogSize = { width: 1200, height: 630 };

export const ogColors = {
  bg: "#0f172a", // slate-900
  heading: "#e2e8f0", // slate-200
  text: "#94a3b8", // slate-400
  muted: "#64748b", // slate-500
  accent: "#5eead4", // teal-300
  chip: "rgba(45, 212, 191, 0.1)", // teal-400/10
};

// Images under /public as data URLs, since the image renderer can't fetch relative paths.
export async function publicImage(src: string) {
  const data = await readFile(join(process.cwd(), "public", src));
  const type = src.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${data.toString("base64")}`;
}

export function Chip({ children }: { children: string }) {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: 999,
        background: ogColors.chip,
        color: ogColors.accent,
        fontSize: 22,
        padding: "6px 18px",
      }}
    >
      {children}
    </div>
  );
}
