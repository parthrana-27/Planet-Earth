import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { opacity: 0, scale: 0.9, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
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
            id="contact"
        >
            <div className="w-full max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 uppercase tracking-widest text-center bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
                    Contact Me
                </h2>

                <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-lg shadow-2xl relative overflow-hidden group">
                    <form
                        ref={formRef}
                        action="https://formspree.io/f/YOUR_FORM_ID"
                        method="POST"
                        className="space-y-6 relative z-10"
                    >
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-blue-100/50 uppercase tracking-wider">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-blue-100/50 uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-blue-100/50 uppercase tracking-wider">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                                placeholder="How can I help you?"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-blue-50 transition-colors uppercase tracking-widest text-sm active:scale-95"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-black/20 rounded-full blur-3xl -z-0 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-gray-500/10 rounded-full blur-3xl -z-0 group-hover:bg-gray-500/20 transition-colors" />
                </div>
            </div>
        </section>
    );
};

export default Contact;
