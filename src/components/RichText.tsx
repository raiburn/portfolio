import { Fragment } from "react";

// Renders **text** as highlighted text.
export function RichText({ text }: { text: string }) {
  return text.split("**").map((part, i) =>
    i % 2 ? (
      <span key={i} className="font-medium text-slate-200">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
