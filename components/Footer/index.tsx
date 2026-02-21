import React from 'react';
import { cn } from "@/lib/utils";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaEnvelope
} from 'react-icons/fa';
import {
    SiLeetcode,
    SiCodeforces,
    SiCodechef
} from 'react-icons/si';

const Footer = () => {
    const socials = [
        { icon: FaGithub, href: "https://github.com/parthrana-27", label: "GitHub" },
        { icon: FaLinkedin, href: "https://www.linkedin.com/in/parth-rana-a9958a287/", label: "LinkedIn" },
        { icon: FaEnvelope, href: "mailto:ranaparth296@gmail.com", label: "Mail" },
        { icon: SiLeetcode, href: "https://leetcode.com/u/parth296/", label: "LeetCode" },
        { icon: SiCodeforces, href: "https://codeforces.com/profile/ranaparth296", label: "Codeforces" },
        { icon: FaInstagram, href: "https://www.instagram.com/_.pparthhh/", label: "Instagram" }
    ];

    return (
        <footer className="relative z-10 py-16 px-[5%] border-t border-white/10 bg-white/10 backdrop-blur-lg mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                <div className="space-y-4">
                    <div className="text-2xl font-black tracking-tighter text-white">
                        PR<span className="text-black">.</span>
                    </div>
                    <p className="text-sm text-blue-100/40 max-w-xs leading-relaxed">
                        Computer Engineering student dedicated to crafting intelligent systems and meaningful digital experiences. Let's build the future together.
                    </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-6">
                    <h3 className="text-xs uppercase tracking-[0.3em] font-black text-white/40">Get in touch</h3>
                    <div className="flex flex-wrap items-center gap-4 md:gap-6">
                        {socials.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all hover:-translate-y-1 active:scale-90"
                                aria-label={social.label}
                            >
                                <social.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/20" suppressHydrationWarning>
                    © {new Date().getFullYear()} Parth Rana <span className="mx-2 hidden md:inline">|</span> Crafted with Code
                </div>
                <div className="flex gap-8">
                    {['About', 'Projects', 'Contact'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase tracking-widest font-bold text-white/20 hover:text-white transition-colors">
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
