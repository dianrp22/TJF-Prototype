"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;       // posisi sekarang
  hx: number; hy: number;     // posisi rumah (home)
  vx: number; vy: number;
  size: number; opacity: number;
}

const COUNT        = 110;
const ATTRACT_R    = 180;
const ATTRACT_F    = 3.0;
const MIN_DIST     = 26;
const SPRING       = 0.045;   // kekuatan balik ke rumah
const FRICTION     = 0.87;
const CONNECT_DIST = 120;

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const ptsRef    = useRef<Particle[]>([]);
  const rafRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let alive = true;
    const parent = canvas.parentElement as HTMLElement;
    let W = parent.offsetWidth;
    let H = parent.offsetHeight;

    const applySize = () => {
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
    };

    const spawn = () => {
      ptsRef.current = Array.from({ length: COUNT }, () => {
        const hx = Math.random() * W;
        const hy = Math.random() * H;
        return {
          x: hx, y: hy,
          hx, hy,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.8,
          opacity: Math.random() * 0.45 + 0.3,
        };
      });
    };

    const tick = () => {
      if (!alive) return;
      const { x: mx, y: my } = mouseRef.current;
      const mouseActive = mx > -100;

      ctx.clearRect(0, 0, W, H);

      for (const p of ptsRef.current) {
        const dx = mx - p.x, dy = my - p.y;
        const d  = Math.sqrt(dx * dx + dy * dy) || 1;

        if (mouseActive && d < ATTRACT_R) {
          // tarik ke kursor, orbit di jarak minimum
          if (d < MIN_DIST) {
            p.vx -= (dx / d) * 0.5;
            p.vy -= (dy / d) * 0.5;
          } else {
            const f = (1 - d / ATTRACT_R) * ATTRACT_F;
            p.vx += (dx / d) * f * 0.09;
            p.vy += (dy / d) * f * 0.09;
          }
        } else {
          // spring balik ke posisi rumah
          p.vx += (p.hx - p.x) * SPRING;
          p.vy += (p.hy - p.y) * SPRING;
        }

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x  += p.vx;
        p.y  += p.vy;

        // proximity glow (pakai d yang sudah dihitung)
        const nr = mouseActive ? Math.max(0, 1 - d / ATTRACT_R) : 0;

        if (nr > 0) {
          const r  = p.size + nr * 6;
          const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          gr.addColorStop(0, `rgba(134,239,172,${(nr * 0.85).toFixed(2)})`);
          gr.addColorStop(1, "rgba(134,239,172,0)");
          ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = gr; ctx.fill();
        }

        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(p.opacity + nr * 0.4).toFixed(2)})`;
        ctx.fill();
      }

      // connection lines
      const pts = ptsRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${((1 - d / CONNECT_DIST) * 0.2).toFixed(2)})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }

      // cursor dot
      if (mouseActive) {
        ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(() => {
      applySize();
      spawn();
      tick();
    });

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect(), t = e.touches[0];
      mouseRef.current = { x: t.clientX - r.left, y: t.clientY - r.top };
    };
    const onResize = () => { applySize(); spawn(); };

    window.addEventListener("mousemove",    onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchmove",    onTouch, { passive: true });
    window.addEventListener("resize",       onResize);

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove",    onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchmove",    onTouch);
      window.removeEventListener("resize",       onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}
