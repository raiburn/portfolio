"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "ask", label: "Ask AI" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

// Section links whose indicator line grows on the section currently in view.
export function SectionNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="In-page jump links" className="hidden lg:block">
      <ul className="mt-16 w-max">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a href={`#${id}`} className="group flex items-center py-3">
                <span
                  className={`mr-4 h-px transition-all motion-reduce:transition-none group-hover:w-16 group-hover:bg-slate-200 ${
                    isActive ? "w-16 bg-slate-200" : "w-8 bg-slate-600"
                  }`}
                />
                <span
                  className={`text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 ${
                    isActive ? "text-slate-200" : "text-slate-500"
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
