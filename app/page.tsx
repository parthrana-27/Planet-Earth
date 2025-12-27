"use client"
import { useEffect, useRef } from "react";
import initPlanet3D from "@/components/3D/planet"
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const { destroy } = initPlanet3D(canvasRef.current)
    return () => {
      destroy && destroy()
    }
  }, []);

  return (
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
  );
}
