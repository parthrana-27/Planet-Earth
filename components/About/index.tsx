import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

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
                    <div className="space-y-6 text-sm md:text-lg leading-relaxed text-blue-100/70 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                        <p>
                            Hello! I'm <span className="text-white font-semibold">Parth Rana</span>, a passionate developer with a love for creating
                            immersive web experiences. My journey in tech is driven by curiosity
                            and a desire to build things that make a difference.
                        </p>
                        <p>
                            I specialize in front-end development, 3D web graphics, and
                            interactive design. When I'm not coding, you can find me exploring
                            new technologies or gazing at the stars.
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="aspect-square rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-blue-100/30 group-hover:border-white/20 transition-colors">
                            <span className="text-sm md:text-base uppercase tracking-widest font-medium">My Photo</span>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
