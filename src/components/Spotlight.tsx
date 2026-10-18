"use client";

import { useEffect, useRef } from "react";

// Soft radial glow that follows the cursor (large screens only).
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ref.current?.style.setProperty("--x", `${e.clientX}px`);
      ref.current?.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden transition duration-300 lg:block"
      style={{
        background:
          "radial-gradient(600px at var(--x, -999px) var(--y, -999px), rgba(29, 78, 216, 0.15), transparent 80%)",
      }}
    />
  );
}
