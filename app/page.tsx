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

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Initialize 3D scene
    const { scene, camera, earthGroup, stars, destroy } = initPlanet3D(canvasRef.current);

    // Hero Reveal Animation
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl.from(".hero-title", { opacity: 0, y: 100, duration: 1.5, ease: "power4.out" })
      .from(".hero-subtitle", { opacity: 0, y: 20, duration: 1, ease: "power3.out" }, "-=1")
      .from(".hero-cta", { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)" }, "-=0.8")
      .from(".scroll-hint", { opacity: 0, y: -20, duration: 1 }, "-=1");

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

        <section className="h-screen flex items-center justify-center relative z-10 text-center px-6">
          <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none bg-gradient-to-b from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent hero-title">
              PARTH RANA
            </h1>
            <p className="text-sm md:text-xl text-gray-500 font-medium max-w-xl mx-auto leading-relaxed hero-subtitle">
              AI agents that actually bring value to businesses and elevate workers productivity.
            </p>
            <div className="flex justify-center hero-cta">
              <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold text-sm md:text-base hover:bg-black transition-all shadow-xl hover:shadow-2xl active:scale-95">
                Contact Me
              </button>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 scroll-hint">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">Scroll to Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
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
