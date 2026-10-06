"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and a boolean that flips to true once the element
 * has come within `margin` of the viewport (and stays true).
 */
export function useInView<T extends HTMLElement>(margin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);

  return { ref, inView };
}
