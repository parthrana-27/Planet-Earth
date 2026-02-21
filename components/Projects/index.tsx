import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const projects = [
        {
            id: 1,
            title: "Project Alpha",
            desc: "A futuristic dashboard interface.",
        },
        {
            id: 2,
            title: "Project Beta",
            desc: "E-commerce platform with 3D product view.",
        },
        {
            id: 3,
            title: "Project Gamma",
            desc: "AI-powered chat application.",
        }
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center px-[5%] md:px-[10%] py-20 z-10"
            id="projects"
        >
            <div className="w-full max-w-6xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 uppercase tracking-widest bg-gradient-to-r from-white via-blue-200 to-gray-500 bg-clip-text text-transparent text-center">
                    Projects
                </h2>
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative p-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/[0.15] hover:border-white/20 transition-all">
                            <div className="aspect-video w-full rounded-xl bg-black/40 border border-white/5 mb-6 flex items-center justify-center text-blue-100/20 group-hover:text-blue-100/40 transition-colors overflow-hidden relative">
                                <span className="text-sm uppercase tracking-tighter font-semibold z-10">Preview Image</span>
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-500/5 to-black/5 group-hover:opacity-100 opacity-0 transition-opacity" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors uppercase tracking-tight">{project.title}</h3>
                            <p className="text-sm md:text-base text-inherit opacity-60 leading-relaxed mb-6 h-12 line-clamp-2">{project.desc}</p>
                            <Link
                                href={`/projects/${project.id}`}
                                className="inline-flex items-center text-sm font-semibold text-white/90 hover:text-white group/link"
                            >
                                View Case Study
                                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                            </Link>

                            {/* Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-500/0 via-gray-500/0 to-black/0 group-hover:from-gray-500/10 group-hover:via-gray-500/10 group-hover:to-black/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all -z-10" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
