"use client";

import { useEffect, useState } from "react";

// A bar that slides in once the visitor has scrolled past most of the first screen.
export function StickyBar({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-30 border-b border-olive/10 bg-background/90 backdrop-blur transition duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      {children}
    </div>
  );
}
