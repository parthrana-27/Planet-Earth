import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

const Education = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (timelineRef.current) {
            gsap.fromTo(timelineRef.current.children,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    stagger: 0.2,
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

    const educationData = [
        {
            title: "Bachelor of Technology",
            date: "2022 - Present",
            subtitle: "Computer Science & Engineering",
            description: "Focusing on software development, algorithms, and 3D web technologies."
        },
        {
            title: "High School",
            date: "2020 - 2022",
            subtitle: "Science Stream",
            description: "Foundation in Physics, Chemistry, and Mathematics."
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-end px-[5%] md:px-[10%] py-20 z-10"
            id="education"
        >
            <div className="w-full max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 uppercase tracking-widest text-right bg-gradient-to-l from-white to-gray-500 bg-clip-text text-transparent">
                    Education
                </h2>
                <div ref={timelineRef} className="space-y-8 border-r-2 border-white/10 pr-8">
                    {educationData.map((item, index) => (
                        <div key={index} className="relative group text-right">
                            <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group-hover:bg-white/[0.08] transition-all">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <span className="inline-block text-xs md:text-sm font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
                                    {item.date}
                                </span>
                                <p className="text-sm md:text-base font-semibold text-blue-100/90 mb-2">{item.subtitle}</p>
                                <p className="text-xs md:text-sm text-blue-100/50 leading-relaxed">{item.description}</p>
                            </div>
                            {/* Timeline dot */}
                            <div className="absolute top-1/2 -right-[41px] -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
