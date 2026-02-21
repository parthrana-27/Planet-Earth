import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

const Skills = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const skillCategories = [
        {
            name: "Programming",
            skills: ["C++", "C", "Python", "JavaScript", "Java", "HTML", "CSS"]
        },
        {
            name: "Frameworks & Tech",
            skills: ["Node.js", "Express.js", "Next.js", "Three.js", "GSAP", "OpenCV", "Bootstrap", "Particles.js"]
        },
        {
            name: "Databases",
            skills: ["SQL", "MongoDB"]
        },
        {
            name: "Tools",
            skills: ["Git", "Tableau", "FastAPI", "Flask", "REST APIs", "Cisco"]
        }
    ];

    const coreStrengths = ["AI", "NLP", "Computer Vision", "Problem Solving", "Full-Stack Development", "Analytical Thinking"];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (contentRef.current) {
            gsap.fromTo(contentRef.current.children,
                { opacity: 0, scale: 0.9, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
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
            id="skills"
        >
            <div className="w-full max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent inline-block">
                        SKILLS
                    </h2>
                </div>

                <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillCategories.map((cat, idx) => (
                        <div key={idx} className="p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/[0.15] transition-all group">
                            <h3 className="text-lg font-bold text-black mb-6 uppercase tracking-wider underline underline-offset-8 decoration-gray-300">{cat.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill, sIdx) => (
                                    <span key={sIdx} className="px-3 py-1.5 rounded-lg border border-white/20 bg-black text-xs md:text-sm text-white opacity-80 group-hover:opacity-100 transition-opacity">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-gray-500/10 to-black/10 backdrop-blur-md text-center">
                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Core Strengths</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {coreStrengths.map((strength, idx) => (
                            <span key={idx} className="flex items-center gap-2 text-sm md:text-base font-medium text-white/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
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
