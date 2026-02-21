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
            title: "Institute of Technology, Nirma University",
            date: "2023 - 2027",
            subtitle: "B.Tech Computer Science & Engineering",
            description: "Current CGPA: 8.74"
        },
        {
            title: "Riverdale Academy, Surat",
            date: "2021 - 2023",
            subtitle: "HSC – Science",
            description: "Result: 87.54%"
        },
        {
            title: "R.S.M Poonawala School, Surat",
            date: "2019 - 2021",
            subtitle: "SSC",
            description: "Result: 95%"
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
                            <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md group-hover:bg-white/[0.15] transition-all">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <span className="inline-block text-xs md:text-sm font-medium px-3 py-1 rounded-full bg-white/10 text-inherit border border-white/20 mb-3">
                                    {item.date}
                                </span>
                                <p className="text-sm md:text-base font-semibold text-inherit opacity-90 mb-2">{item.subtitle}</p>
                                <p className="text-xs md:text-sm text-inherit opacity-50 leading-relaxed">{item.description}</p>
                            </div>
                            {/* Timeline dot */}
                            <div className="absolute top-1/2 -right-[41px] -translate-y-1/2 w-4 h-4 rounded-full bg-black shadow-[0_0_15px_rgba(255,255,255,0.2)] z-20" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
