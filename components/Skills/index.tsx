'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Code2,
    Cpu,
    Database,
    Wrench,
    Sparkles,
    Layers,
    Terminal,
    Bot
} from 'lucide-react';

const Skills = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState('all');

    const skillCategories = [
        {
            id: "ai",
            name: "AI & Machine Learning",
            icon: Bot,
            description: "Core algorithms, deep learning models, and computer vision pipelines",
            skills: ["Python", "Computer Vision", "OpenCV", "NLP", "Machine Learning", "Scikit-Learn", "Genetic Algorithms", "Soft Computing"]
        },
        {
            id: "web-3d",
            name: "Frontend & 3D Web",
            icon: Layers,
            description: "Next-generation web applications, interactive shaders, and smooth animation",
            skills: ["Three.js", "GSAP", "Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5/CSS3"]
        },
        {
            id: "backend-db",
            name: "Backend & Databases",
            icon: Database,
            description: "Scalable server architectures, high-performance APIs, and data modeling",
            skills: ["Node.js", "Express.js", "FastAPI", "Flask", "MongoDB", "SQL / PostgreSQL", "REST APIs"]
        },
        {
            id: "systems-tools",
            name: "Systems & Engineering Tools",
            icon: Cpu,
            description: "Low-level computation, version control, and infrastructure workflows",
            skills: ["C++", "C", "Java", "Git & GitHub", "Linux", "Tableau", "Cisco Networking"]
        }
    ];

    const allSkillsRow1 = [
        "Python", "C++", "Three.js", "Next.js", "React", "Machine Learning", "OpenCV", "GSAP", "TypeScript", "Node.js", "MongoDB"
    ];

    const allSkillsRow2 = [
        "Computer Vision", "SQL", "FastAPI", "NLP", "Genetic Algorithms", "Express.js", "Git", "Java", "Flask", "Tailwind CSS", "Data Structures"
    ];

    const coreStrengths = [
        "Artificial Intelligence",
        "Natural Language Processing",
        "Computer Vision",
        "Algorithmic Problem Solving",
        "Full-Stack Architecture",
        "Interactive 3D Graphics"
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
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

    const filteredCategories = activeTab === 'all'
        ? skillCategories
        : skillCategories.filter(cat => cat.id === activeTab);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center px-[5%] md:px-[10%] py-28 z-10 overflow-hidden"
            id="skills"
        >
            {/* Ambient Background Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] ambient-glow-blue rounded-full pointer-events-none blur-3xl -z-10" />

            {/* Oversized Section Marker */}
            <div className="section-watermark top-10 left-4 md:left-12 text-[140px] md:text-[220px]">
                03.
            </div>

            <div className="w-full max-w-6xl relative z-10">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-blue-400/90 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                            Technical Arsenal
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-blue-100/90 to-neutral-500 bg-clip-text text-transparent">
                        Skills & Stack
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
                        A curated toolkit combining low-level systems programming, machine intelligence, and high-fidelity 3D web interfaces.
                    </p>
                </div>

                {/* Infinite Marquee Showcase (Pause on Hover) */}
                <div className="mb-14 space-y-3 pause-on-hover overflow-hidden py-4 border-y border-white/5 bg-neutral-950/30 backdrop-blur-md rounded-2xl">
                    {/* Ribbon 1: Moving Left */}
                    <div className="animate-marquee-left gap-3">
                        {[...allSkillsRow1, ...allSkillsRow1].map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-medium bg-white/[0.04] border border-white/10 text-neutral-200 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-300 transition-all duration-200 shrink-0 cursor-default select-none shadow-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Ribbon 2: Moving Right */}
                    <div className="animate-marquee-right gap-3">
                        {[...allSkillsRow2, ...allSkillsRow2].map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-medium bg-white/[0.04] border border-white/10 text-neutral-200 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-300 transition-all duration-200 shrink-0 cursor-default select-none shadow-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Interactive Category Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {[
                        { id: 'all', label: 'All Domains' },
                        { id: 'ai', label: 'AI & Machine Learning' },
                        { id: 'web-3d', label: 'Frontend & 3D' },
                        { id: 'backend-db', label: 'Backend & Databases' },
                        { id: 'systems-tools', label: 'Systems & Tools' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-blue-400 to-violet-500 text-white border-blue-400 shadow-lg shadow-blue-500/20 font-bold'
                                    : 'bg-white/5 text-neutral-400 border-white/10 hover:border-blue-500/30 hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Filterable Domain Cards Grid */}
                <div
                    ref={gridRef}
                    className={`grid gap-6 ${
                        filteredCategories.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'
                    }`}
                >
                    {filteredCategories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <div
                                key={cat.id}
                                className="p-8 rounded-3xl border border-white/10 bg-neutral-950/40 backdrop-blur-xl hover:bg-neutral-900/60 hover:border-blue-500/30 transition-all duration-300 shadow-2xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                            {cat.name}
                                        </h3>
                                        <p className="text-xs text-neutral-400 font-normal">
                                            {cat.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-2">
                                    {cat.skills.map((skill, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-xs font-mono text-neutral-300 group-hover:border-white/20 hover:!border-blue-400/60 hover:!bg-blue-500/15 hover:!text-white transition-all duration-200"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Core Strengths Pill Container */}
                <div className="mt-12 p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-neutral-950/60 via-neutral-900/40 to-neutral-950/60 backdrop-blur-xl text-center">
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400/90 mb-5 block">
                        Core Competencies
                    </span>
                    <div className="flex flex-wrap justify-center gap-3">
                        {coreStrengths.map((strength, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs md:text-sm font-medium text-neutral-200 hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-200"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                {strength}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Skills;

