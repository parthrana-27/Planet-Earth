"use client"
import { useEffect } from "react";
import initPlanet3D from "@/components/3D/planet"
export default function Home() {
  useEffect(() => {
    initPlanet3D()
  }, []);

  return (
    <div className="page">
      <section className="hero_main">
        <div className="content">
          <h1> welcome to our planet</h1>
          <p>Explore the beauty of our planet with our 3D planet visualization. </p>
          <button className="cta_btn"> Get started. </button>
        </div>
        <canvas className="planet-3D" />
      </section>
    </div>
  );
}
