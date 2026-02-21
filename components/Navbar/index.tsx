'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const lenis = useLenis();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Background change logic
            setIsScrolled(currentScrollY > 50);

            // Hide/Show logic
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navItems = ['About', 'Education', 'Skills', 'Projects', 'Contact'];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.getElementById(targetId);
        if (element && lenis) {
            lenis.scrollTo(element, {
                offset: -80,
                duration: 1.5,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    };

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 w-full px-[5%] transition-all duration-500 z-[100] border-b border-white/10 bg-white/10 backdrop-blur-lg shadow-2xl",
                    isScrolled ? "py-4" : "py-6",
                    !isVisible && !isOpen ? "-translate-y-full" : "translate-y-0"
                )}
                id="main-navbar"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link
                        href="/"
                        className={cn(
                            "text-2xl font-black tracking-tighter transition-all duration-300 hover:scale-105 active:scale-95 group",
                            "text-inherit"
                        )}
                    >
                        PR<span className="text-black group-hover:text-gray-600 transition-colors">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-10">
                        {navItems.map((item) => (
                            <li key={item} className="relative group">
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) => handleNavClick(e, item.toLowerCase())}
                                    className={cn(
                                        "text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300",
                                        "text-inherit opacity-60 hover:opacity-100"
                                    )}
                                >
                                    {item}
                                </a>
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full",
                                    "bg-current"
                                )} />
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "md:hidden p-2 rounded-full transition-colors font-bold",
                            "text-inherit hover:bg-current hover:bg-opacity-10"
                        )}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <div className={cn(
                "fixed inset-0 z-[90] bg-white transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden flex flex-col items-center justify-center gap-6",
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            )}>
                {navItems.map((item, index) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        onClick={(e) => handleNavClick(e, item.toLowerCase())}
                        className={cn(
                            "text-5xl font-black tracking-tighter text-black hover:text-gray-600 transition-all duration-300 uppercase",
                            "hover:scale-110 active:scale-95"
                        )}
                        style={{
                            transitionDelay: isOpen ? `${index * 100 + 200}ms` : '0ms',
                            transform: isOpen ? 'translateY(0)' : 'translateY(100px)',
                            opacity: isOpen ? 1 : 0
                        }}
                    >
                        {item}
                    </a>
                ))}
            </div>
        </>
    );
};

export default Navbar;
