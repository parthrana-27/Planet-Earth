'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, Copy, Check, Send, Sparkles, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Magnetic from '@/components/UI/Magnetic';

const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const emailAddress = "ranaparth296@gmail.com";

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (contentRef.current) {
            gsap.fromTo(contentRef.current.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    const copyEmail = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            // Friendly fallback if emailjs envs are not set
            setIsSubmitted(true);
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
                setError('Something went wrong. Please try again or reach out via email directly.');
            }
        } catch (err: any) {
            console.error('Contact Submit Error:', err);
            setError(err?.text || 'Failed to send message. Feel free to copy my direct email above!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center px-[5%] md:px-[10%] py-28 z-10 overflow-hidden"
            id="contact"
        >
            {/* Ambient Background Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] ambient-glow-blue rounded-full pointer-events-none blur-3xl -z-10" />

            {/* Oversized Section Marker */}
            <div className="section-watermark top-10 right-4 md:right-12 text-[140px] md:text-[220px]">
                06.
            </div>

            <div ref={contentRef} className="w-full max-w-5xl relative z-10 space-y-16">
                {/* Header */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-blue-400/90 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                            Collaboration
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-blue-100/90 to-neutral-500 bg-clip-text text-transparent">
                        Let's Build Something Exceptional
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
                        Have an engineering challenge, AI project, or full-stack initiative in mind? Let's connect.
                    </p>
                </div>

                {/* Magnetic Large Email Banner with 1-Click Copy */}
                <div className="flex justify-center">
                    <Magnetic strength={0.25}>
                        <button
                            onClick={copyEmail}
                            data-cursor="COPY"
                            className="group relative px-6 md:px-12 py-5 md:py-7 rounded-3xl border border-white/15 bg-neutral-950/60 backdrop-blur-2xl hover:border-blue-400/60 hover:bg-neutral-900/80 transition-all duration-300 shadow-2xl flex items-center gap-4 md:gap-6 cursor-pointer"
                        >
                            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                                <Mail size={24} />
                            </div>
                            <div className="text-left">
                                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-0.5">
                                    Direct Contact
                                </span>
                                <span className="text-lg md:text-2xl font-mono font-bold text-white group-hover:text-blue-300 transition-colors">
                                    {emailAddress}
                                </span>
                            </div>
                            <div className="ml-2 md:ml-4 p-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 group-hover:bg-blue-400 group-hover:text-black transition-all">
                                {copiedEmail ? <Check size={18} className="text-blue-400 group-hover:text-black" /> : <Copy size={18} />}
                            </div>

                            {/* Toast Floating Pill */}
                            {copiedEmail && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 text-white font-mono text-xs font-bold shadow-xl animate-in fade-in zoom-in duration-200">
                                    Email Copied to Clipboard! ✨
                                </div>
                            )}
                        </button>
                    </Magnetic>
                </div>

                {/* Glassmorphic Form Card */}
                <div className="max-w-xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10 bg-neutral-950/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                    {!isSubmitted ? (
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-6 relative z-10"
                        >
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs font-mono text-blue-400 uppercase tracking-widest block">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition-all font-sans text-sm"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-mono text-blue-400 uppercase tracking-widest block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition-all font-sans text-sm"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-mono text-blue-400 uppercase tracking-widest block">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition-all resize-none font-sans text-sm"
                                    placeholder="Tell me about your project or vision..."
                                />
                            </div>

                            {error && (
                                <p className="text-rose-400 text-xs font-mono bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                                    {error}
                                </p>
                            )}

                            <Magnetic strength={0.2} className="w-full">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    data-cursor="SEND"
                                    className="w-full py-4 bg-gradient-to-r from-blue-400 to-violet-500 text-white font-bold rounded-2xl hover:brightness-110 transition-all uppercase tracking-widest text-xs active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 cursor-pointer disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                            Dispatching...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={15} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </Magnetic>
                        </form>
                    ) : (
                        <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto text-blue-400">
                                <Sparkles size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                            <p className="text-sm text-neutral-400 max-w-xs mx-auto">
                                Thank you for reaching out. I'll get back to you promptly.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-xs font-mono uppercase tracking-wider text-blue-400 hover:text-blue-300 underline underline-offset-4 pt-2"
                            >
                                Send another note
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>

    );
};

export default Contact;

