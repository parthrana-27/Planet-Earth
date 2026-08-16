'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, Award, Sparkles } from 'lucide-react';

const Education = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    const educationData = [
        {
            title: "Institute of Technology, Nirma University",
            degree: "B.Tech in Computer Science & Engineering",
            period: "2023 — 2027",
            status: "Pursuing",
            score: "CGPA: 8.74 / 10.0",
            highlights: ["Specializing in AI & Core Systems", "Algorithmic Problem Solving", "Active Open Source Contributor"]
        },
        {
            title: "Riverdale Academy, Surat",
            degree: "Higher Secondary Certificate (HSC – Science)",
            period: "2021 — 2023",
            status: "Completed",
            score: "Score: 87.54%",
            highlights: ["Physics, Chemistry, Mathematics", "Analytical Foundations", "Top Academic Percentile"]
        },
        {
            title: "R.S.M Poonawala School, Surat",
            degree: "Secondary School Certificate (SSC)",
            period: "2019 — 2021",
            status: "Completed",
            score: "Score: 95.00%",
            highlights: ["Distinction in Mathematics & Science", "Academic Excellence Award"]
        }
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Progress line animation tracking scroll
        if (lineRef.current && sectionRef.current) {
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "bottom 85%",
                        scrub: 0.5
                    }
                }
            );
        }

        // Timeline items reveal
        if (itemsRef.current) {
            const cards = itemsRef.current.querySelectorAll('.timeline-card');
            cards.forEach((card, index) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center px-[5%] md:px-[10%] py-28 z-10 overflow-hidden"
            id="education"
        >
            {/* Ambient Background Lighting */}
            <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] ambient-glow-violet rounded-full pointer-events-none blur-3xl -z-10" />

            {/* Oversized Section Marker */}
            <div className="section-watermark top-10 right-4 md:right-12 text-[140px] md:text-[220px]">
                02.
            </div>

            <div className="w-full max-w-4xl relative z-10">
                {/* Header */}
                <div className="mb-16 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-violet-400/90 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                            Academic Journey
                        </span>
                        <span className="h-px w-12 bg-white/10" />
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-violet-100/90 to-neutral-500 bg-clip-text text-transparent">
                        Education
                    </h2>
                </div>

                {/* Vertical Timeline Container */}
                <div className="relative pl-6 md:pl-10" ref={itemsRef}>
                    {/* Background Track Line */}
                    <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-white/10 rounded-full" />

                    {/* Filling Gradient Progress Line */}
                    <div
                        ref={lineRef}
                        style={{ transformOrigin: 'top' }}
                        className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-blue-400 via-violet-500 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.7)]"
                    />

                    <div className="space-y-10">
                        {educationData.map((item, index) => (
                            <div
                                key={index}
                                className="timeline-card relative group pl-4 md:pl-6"
                            >
                                {/* Milestone Node Dot */}
                                <div className="absolute -left-[30px] md:-left-[46px] top-6 w-5 h-5 rounded-full bg-neutral-950 border-2 border-white/20 group-hover:border-violet-400 flex items-center justify-center transition-all duration-300 group-hover:scale-125 shadow-lg group-hover:shadow-[0_0_15px_rgba(139,92,246,0.8)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-violet-400 transition-colors" />
                                </div>

                                {/* Timeline Card */}
                                <div className="p-7 md:p-8 rounded-3xl border border-white/10 bg-neutral-950/40 backdrop-blur-xl group-hover:bg-neutral-900/60 group-hover:border-violet-500/30 transition-all duration-300 shadow-2xl relative overflow-hidden">
                                    {/* Ambient card accent */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/15 transition-colors pointer-events-none" />

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-violet-200 transition-colors flex items-center gap-2.5">
                                            <GraduationCap className="text-violet-400 shrink-0" size={22} />
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-300">
                                                <Calendar size={12} className="text-neutral-400" />
                                                {item.period}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm md:text-base font-semibold text-blue-300/90 mb-3">
                                        {item.degree}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-violet-500/10 border border-violet-500/20 text-violet-300 font-semibold">
                                            <Award size={13} />
                                            {item.score}
                                        </span>
                                    </div>

                                    {/* Highlights list with micro-animations */}
                                    <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2">
                                        {item.highlights.map((hl, hIdx) => (
                                            <span
                                                key={hIdx}
                                                className="text-xs text-neutral-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/5 hover:border-violet-500/30"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-violet-400" />
                                                {hl}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Education;

