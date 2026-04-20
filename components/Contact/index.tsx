'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setError('EmailJS is not configured. Please add NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY to your .env file.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            if (!formRef.current) return;

            const result = await emailjs.sendForm(
                serviceId,
                templateId,
                formRef.current,
                publicKey
            );

            if (result.status === 200) {
                setIsSubmitted(true);
                formRef.current.reset();
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (err: any) {
            console.error('Contact Submit Error:', err);
            setError(err?.text || 'Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center px-[5%] md:px-[10%] py-20 z-10"
            id="contact"
        >
            <div className="w-full max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 uppercase tracking-widest text-center bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
                    Get In Touch
                </h2>

                <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-lg shadow-2xl relative overflow-hidden group min-h-[500px] flex flex-col items-center justify-center">
                    {!isSubmitted ? (
                        <div className="w-full space-y-8 relative z-10">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full space-y-6 transition-all duration-500"
                            >
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-blue-100/50 uppercase tracking-wider">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-blue-100/50 uppercase tracking-wider">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                                        placeholder="Your email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-blue-100/50 uppercase tracking-wider">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none font-sans"
                                        placeholder="How can I help you?"
                                    ></textarea>
                                </div>

                                {error && (
                                    <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-blue-50 transition-all uppercase tracking-widest text-sm active:scale-95 flex items-center justify-center gap-2",
                                        isSubmitting && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>
                            </form>

                            {/* Social Links */}
                            <div className="pt-8 border-t border-white/5 flex justify-center gap-8">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                    <Github size={20} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                    <Linkedin size={20} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                    <Twitter size={20} />
                                </a>
                                <a href="mailto:your-email@example.com" className="text-white/40 hover:text-white transition-colors">
                                    <Mail size={20} />
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                <span className="text-4xl">✨</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-blue-100/60 max-w-[280px] mx-auto">
                                    Thanks for reaching out! I'll get back to you as soon as possible.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-sm font-semibold text-white/40 hover:text-white transition-colors uppercase tracking-widest underline underline-offset-8"
                            >
                                Send another message
                            </button>
                        </div>
                    )}

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-black/20 rounded-full blur-3xl -z-0 group-hover:bg-black/30 transition-colors pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-gray-500/10 rounded-full blur-3xl -z-0 group-hover:bg-gray-500/20 transition-colors pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default Contact;
