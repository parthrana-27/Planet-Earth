import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

const Skills = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cloudRef = useRef<HTMLDivElement>(null);

    const skills = [
        "React", "Next.js", "Three.js", "TypeScript",
        "JavaScript", "HTML5", "CSS3", "GSAP",
        "Tailwind", "Git", "Node.js", "Python"
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (cloudRef.current) {
            gsap.fromTo(cloudRef.current.children,
                { opacity: 0, scale: 0.5, y: 20 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
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
            <div className="w-full max-w-4xl text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 uppercase tracking-widest bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                    Skills
                </h2>
                <div ref={cloudRef} className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all cursor-default text-sm md:text-lg font-medium text-blue-100/80"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
