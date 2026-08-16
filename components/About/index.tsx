'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Sparkles, Terminal, Compass, Brain } from 'lucide-react';

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (contentRef.current) {
            gsap.fromTo(contentRef.current.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!photoRef.current) return;
        const { left, top, width, height } = photoRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setTilt({ x: x * 15, y: -y * 15 });
    };

    const handlePhotoMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-start px-[5%] md:px-[10%] py-28 z-10 overflow-hidden"
            id="about"
        >
            {/* Ambient Background Lighting */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] ambient-glow-blue rounded-full pointer-events-none blur-3xl -z-10" />

            {/* Oversized Section Marker */}
            <div className="section-watermark top-10 left-4 md:left-12 text-[140px] md:text-[220px]">
                01.
            </div>

            <div ref={contentRef} className="w-full max-w-5xl relative z-10">
                {/* Header with Subtitle */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-blue-400/90 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                            Overview
                        </span>
                        <span className="h-px w-12 bg-white/10" />
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-blue-100/90 to-neutral-500 bg-clip-text text-transparent">
                        About Me
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left Column: Editorial Text Blocks */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-neutral-950/40 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                            {/* Inner Ambient Glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-colors" />

                            <div className="space-y-5 text-sm md:text-base leading-relaxed text-neutral-300 font-normal">
                                <p className="text-lg md:text-xl font-medium text-white leading-snug">
                                    I’m a <span className="text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text font-bold">Computer Engineering student</span> dedicated to shaping intelligent algorithms, high-efficiency systems, and modern digital experiences.
                                </p>
                                <p className="text-neutral-400">
                                    My work focuses on bridging the gap between theoretical machine learning models and production-ready applications. I strive for clean architecture, low latency, and intuitive interfaces.
                                </p>
                                <p className="text-neutral-400">
                                    Beyond code, I dive deep into history, global geography, and strategic puzzles like <span className="text-indigo-200 font-medium">chess and Sudoku</span>—disciplines that hone tactical planning and deep problem decomposition.
                                </p>
                            </div>

                            {/* Live Badge Pills */}
                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-blue-500/10 border border-blue-500/20 text-blue-300">
                                    <Brain size={13} className="text-blue-400" />
                                    AI & Intelligent Systems
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-violet-500/10 border border-violet-500/20 text-violet-300">
                                    <Terminal size={13} className="text-violet-400" />
                                    Full-Stack Engineering
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: 3D Floating Photo Card */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div
                            ref={photoRef}
                            onMouseMove={handlePhotoMouseMove}
                            onMouseLeave={handlePhotoMouseLeave}
                            data-cursor="PARTH"
                            style={{
                                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                                transition: tilt.x === 0 ? 'transform 0.5s ease-out' : 'none'
                            }}
                            className="relative w-full max-w-sm aspect-square rounded-3xl border border-white/15 bg-neutral-900/50 backdrop-blur-2xl p-3 shadow-2xl group cursor-pointer hover:border-blue-500/40 transition-all duration-500"
                        >
                            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-950">
                                <Image
                                    src="/parth-pfp-1.png"
                                    alt="Parth Rana"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-[1.05]"
                                />
                                
                                {/* Overlay Gradient & Frame */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/70 backdrop-blur-md bg-neutral-950/60 p-3 rounded-xl border border-white/10">
                                    <span>Parth Rana</span>
                                    <span className="text-blue-400 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                        Open to Roles
                                    </span>
                                </div>
                            </div>

                            {/* Floating decorative ambient aura */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-violet-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default About;

