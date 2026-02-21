import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

import Image from 'next/image';

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (contentRef.current) {
            gsap.fromTo(contentRef.current.children,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
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

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-start px-[5%] md:px-[10%] py-20 z-10"
            id="about"
        >
            <div ref={contentRef} className="w-full max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-widest bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    About Me
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="space-y-6 text-sm md:text-lg leading-relaxed text-inherit opacity-70 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-xl">
                        <p>
                            I’m a <span className="text-white font-semibold">Computer Engineering student</span> passionate about Artificial Intelligence, problem solving, and building efficient systems. I enjoy transforming complex ideas into smart, practical solutions through clean and optimized code.
                        </p>
                        <p>
                            Curiosity drives me to continuously explore new technologies, understand intelligent systems, and keep improving my technical skills.
                        </p>
                        <p>
                            Beyond coding, I have a strong interest in geography and history, and I enjoy sharpening my analytical thinking through <span className="text-white font-medium">chess and Sudoku</span>. These hobbies reflect my love for strategy, logic, and continuous learning.
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="aspect-square rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md overflow-hidden flex items-center justify-center p-2 group-hover:border-white/20 transition-all duration-500 shadow-2xl">
                            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner">
                                <Image
                                    src="/parth-pfp-1.png"
                                    alt="Parth Rana"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-black/20 via-gray-500/20 to-black/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
