import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

import { projects } from '@/data/projects';

const Projects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);


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
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative p-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/[0.15] hover:border-white/20 transition-all">
                            <div className="w-12 h-1 mb-6 bg-gradient-to-r from-blue-500 to-transparent rounded-full opacity-40 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors uppercase tracking-tight">{project.title}</h3>
                            <p className="text-sm md:text-base text-inherit opacity-60 leading-relaxed mb-6 h-12 line-clamp-2">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies?.map(tech => (
                                    <span key={tech} className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border border-white/5 bg-white/5 text-blue-200/50">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all -z-10" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
