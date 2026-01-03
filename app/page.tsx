'use client';

import { useEffect, useRef, useState } from "react";
import initPlanet3D from "@/components/3D/planet"
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "@/styles/Home.module.css";

// ... existing code ...

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Initialize 3D scene
    const { scene, camera, earthGroup, stars, destroy } = initPlanet3D(canvasRef.current);

    // Animation Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Set initial state for Hero (White BG, Dark Text)
    gsap.set("body", { backgroundColor: "#f0f4f8", color: "#1a1a2e" });

    // 1. Hero -> About (Earth moves Right, Stars fade in, BG becomes Dark)
    tl.to("body", {
      backgroundColor: "#0b0d17",
      color: "#ffffff",
      duration: 1,
      ease: "power1.inOut"
    }, "start")

    // 1. Hero -> About (Earth moves Right, Stars fade in)
    tl.to("#main-navbar", {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      ease: "power1.out"
    }, "start")
      .to(".scroll-hint", {
        autoAlpha: 0,
        duration: 0.5
      }, "start")
      .to(stars.material, {
        opacity: 1,
        duration: 1
      }, "start")
      // ... rest of animations ...
      .to(earthGroup.position, {
        x: 2,
        y: 0,
        ease: "power1.inOut",
        duration: 1
      }, "start")
      .to(earthGroup.scale, {
        x: 1.2, y: 1.2, z: 1.2,
        ease: "power1.inOut",
        duration: 1
      }, "start")

      // 2. About -> Education (Earth moves Left)
      .to(earthGroup.position, {
        x: -2,
        ease: "power1.inOut",
        duration: 1
      }, "education")
      .to(earthGroup.scale, {
        x: 1.2, y: 1.2, z: 1.2,
        ease: "power1.inOut",
        duration: 1
      }, "education")

      // 3. Education -> Skills (Earth Center, slightly back)
      .to(earthGroup.position, {
        x: 0,
        y: 0,
        z: -1.5,
        ease: "power1.inOut",
        duration: 1
      }, "skills")

      // 4. Skills -> Projects (Earth stays Center, pushed back more)
      .to(earthGroup.position, {
        z: -3,
        ease: "power1.inOut",
        duration: 1
      }, "projects")

      // 5. Projects -> Contact (Earth Scales UP at the end)
      .to(earthGroup.position, {
        z: 0,
        x: 0,
        y: 0,
        ease: "power1.inOut",
        duration: 1
      }, "contact")
      .to(earthGroup.scale, {
        x: 2.5, y: 2.5, z: 2.5,
        ease: "power1.inOut",
        duration: 1
      }, "contact");


    return () => {
      destroy && destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Navbar />
      <div className="page" suppressHydrationWarning>
        <div className={`${styles.canvasContainer} canvas-container`}>
          <canvas ref={canvasRef} className={`${styles.planet3D} planet-3D`} suppressHydrationWarning />
        </div>

        <section className={`${styles.heroMain} hero_main`}>
          <div className={`${styles.content} content`}>
            <h1>PARTH RANA</h1>
          </div>
          <div className={`${styles.scrollHint} scroll-hint`}>
            <span>Scroll to Explore</span>
            <div className={`${styles.arrow} arrow`}>↓</div>
          </div>
        </section>

        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
