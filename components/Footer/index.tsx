'use client';

import React from 'react';
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaEnvelope
} from 'react-icons/fa';
import {
    SiLeetcode,
    SiCodeforces
} from 'react-icons/si';
import { ArrowUp, Globe, Sparkles } from 'lucide-react';
import Magnetic from '@/components/UI/Magnetic';
import { useLenis } from 'lenis/react';

const Footer = () => {
    const lenis = useLenis();

    const socials = [
        { icon: FaGithub, href: "https://github.com/parthrana-27", label: "GitHub", handle: "parthrana-27" },
        { icon: FaLinkedin, href: "https://www.linkedin.com/in/parth-rana-a9958a287/", label: "LinkedIn", handle: "parth-rana" },
        { icon: FaEnvelope, href: "mailto:ranaparth296@gmail.com", label: "Mail", handle: "ranaparth296@gmail.com" },
        { icon: SiLeetcode, href: "https://leetcode.com/u/parth296/", label: "LeetCode", handle: "parth296" },
        { icon: SiCodeforces, href: "https://codeforces.com/profile/ranaparth296", label: "Codeforces", handle: "ranaparth296" },
        { icon: FaInstagram, href: "https://www.instagram.com/_.pparthhh/", label: "Instagram", handle: "_.pparthhh" }
    ];

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, {
                duration: 1.8,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="relative z-10 py-20 px-[5%] md:px-[10%] border-t border-white/10 bg-neutral-950/80 backdrop-blur-2xl">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                {/* Brand Column */}
                <div className="space-y-4 max-w-sm">
                    <div className="text-3xl font-black tracking-tighter text-white">
                        PR<span className="text-blue-400">.</span>
                    </div>
                    <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-normal">
                        Computer Engineering student dedicated to crafting intelligent systems and meaningful digital experiences.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pt-1">
                        <Globe size={13} className="text-blue-400" />
                        <span>Based in India • Available Worldwide</span>
                    </div>
                </div>

                {/* Social Badges with Magnetic Pull */}
                <div className="flex flex-col items-start md:items-end gap-5">
                    <h3 className="text-xs uppercase tracking-[0.3em] font-mono font-bold text-neutral-400">
                        Connect & Follow
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                        {socials.map((social, idx) => (
                            <Magnetic key={idx} strength={0.3}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor={social.label.toUpperCase()}
                                    className="w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-neutral-300 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition-all active:scale-90 shadow-md"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[11px] font-mono text-neutral-400" suppressHydrationWarning>
                    © {new Date().getFullYear()} Parth Rana — Art-Directed Personal Studio.
                </div>

                <div className="flex items-center gap-6">
                    {['About', 'Education', 'Skills', 'Certifications', 'Projects', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 hover:text-blue-300 transition-colors"
                        >
                            {item}
                        </a>
                    ))}

                    <Magnetic strength={0.35}>
                        <button
                            onClick={scrollToTop}
                            data-cursor="TOP"
                            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-violet-500 hover:text-white transition-all border border-white/15 ml-2"
                            aria-label="Back to top"
                        >
                            <ArrowUp size={15} />
                        </button>
                    </Magnetic>
                </div>
            </div>

        </footer>
    );
};

export default Footer;

