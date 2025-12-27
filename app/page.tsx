'use client';

import { useEffect, useRef, useState } from "react";
import initPlanet3D from "@/components/3D/planet"
import Preloader from "@/components/Preloader";
import gsap from "gsap";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize 3D immediately so it's ready when the curtain lifts
    if (!canvasRef.current) return;
    const { destroy } = initPlanet3D(canvasRef.current);

    // Optional: Fade in content is no longer needed since curtain reveals it
    // but we can keep a subtle trigger if we want, or just leave it.
    // For now, removing the GSAP fade-in to let the curtain do the work.

    return () => {
      destroy && destroy()
    }
  }, []); // Run once on mount

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="page" suppressHydrationWarning>
        <section className="hero_main">
          <div className="content">
            <h1>PARTH RANA</h1>
            <p>This is a 3D portfolio website  </p>
            <button className="cta_btn"> Get started. </button>
          </div>
          <canvas ref={canvasRef} className="planet-3D" suppressHydrationWarning />
        </section>
      </div>
    </>
  );
}
