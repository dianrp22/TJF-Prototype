"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 1800 }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  const [display, setDisplay] = useState(value);

  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!inView || isNaN(numericValue)) return;
    let raf: number;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericValue);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numericValue, suffix, duration]);

  return <span ref={ref}>{display}</span>;
}
