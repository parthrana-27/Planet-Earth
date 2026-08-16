'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Github, Sparkles, Terminal, Activity, Layers } from 'lucide-react';
import { projects, type Project } from '@/data/projects';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const isEven = index % 2 === 0;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setTilt({ x: x * 10, y: -y * 10 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div
            className={`project-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
            }`}
        >
            {/* Mockup Showcase Column */}
            <div
                className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-cursor="EXPLORE"
                style={{
                    transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                    transition: tilt.x === 0 ? 'transform 0.5s ease-out' : 'none'
                }}
            >
                <div className="group relative rounded-3xl border border-white/15 bg-neutral-950/60 backdrop-blur-xl shadow-2xl overflow-hidden cursor-pointer hover:border-blue-500/40 transition-all duration-500">
                    {/* Ambient Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-violet-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                    {/* Browser Mockup Header */}
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-neutral-900/70 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                            <span className="w-3 h-3 rounded-full bg-blue-500/80" />
                            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 max-w-[200px] truncate">
                            parthrana.dev/projects/{project.id}
                        </div>
                        <div className="w-12 text-right">
                            <span className="text-[10px] font-mono text-blue-400/90 font-bold">LIVE</span>
                        </div>
                    </div>

                    {/* Thumbnail Image with Depth & Overlay */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                        {/* Floating Metric Badge */}
                        {project.metric && (
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-neutral-950/80 backdrop-blur-md border border-white/15 text-blue-300 shadow-xl">
                                    <Activity size={13} className="text-blue-400" />
                                    {project.metric}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Case Study Editorial Content Column */}
            <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                <div>
                    <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 font-bold">
                            {project.category || 'Featured Work'}
                        </span>
                        <span className="h-px w-8 bg-white/10" />
                    </div>
                    <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                        {project.title}
                    </h3>
                </div>

                {project.hook && (
                    <p className="text-sm md:text-base font-medium text-blue-100/90 leading-snug">
                        "{project.hook}"
                    </p>
                )}

                <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
                    {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies?.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-lg border border-white/10 bg-white/[0.04] text-neutral-300 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-300 transition-all duration-200"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4">
                    <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/15"
                    >
                        Case Study
                        <ArrowUpRight size={15} />
                    </Link>

                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:border-blue-400/40 hover:bg-blue-500/10 transition-all text-xs font-mono"
                        >
                            <Github size={15} />
                            Source
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll('.project-item');
            items.forEach((item, index) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: index * 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 75%",
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
            id="projects"
        >
            {/* Ambient Background Lighting */}
            <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] ambient-glow-violet rounded-full pointer-events-none blur-3xl -z-10" />

            {/* Oversized Section Marker */}
            <div className="section-watermark top-10 left-4 md:left-12 text-[140px] md:text-[220px]">
                05.
            </div>

            <div className="w-full max-w-6xl relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-blue-400/90 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                            Selected Works
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-blue-100/90 to-neutral-500 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
                        End-to-end algorithmic solutions spanning natural language processing, heuristic genetic optimization, and interactive computing.
                    </p>
                </div>

                {/* Asymmetric Editorial Grid */}
                <div ref={containerRef} className="space-y-24 md:space-y-32">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;


