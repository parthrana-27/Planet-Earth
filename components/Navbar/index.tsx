import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";

const Navbar = () => {
    return (
        <nav
            className="fixed top-0 left-0 w-full px-[5%] py-6 flex justify-between items-center z-[100] transition-all duration-300 opacity-0 -translate-y-full backdrop-blur-sm border-b border-white/5 bg-black/10"
            id="main-navbar"
        >
            <div className="text-xl font-black tracking-tighter text-white">
                PR<span className="text-blue-500">.</span>
            </div>

            <ul className="hidden md:flex items-center gap-8">
                {['About', 'Education', 'Skills', 'Projects', 'Contact'].map((item) => (
                    <li key={item}>
                        <Link
                            href={`#${item.toLowerCase()}`}
                            className="text-xs uppercase tracking-[0.2em] font-bold text-white/50 hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Icon (Placeholder) */}
            <div className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 cursor-pointer group">
                <div className="w-full h-0.5 bg-white scale-x-100 group-hover:scale-x-75 transition-transform origin-right" />
                <div className="w-full h-0.5 bg-white" />
            </div>
        </nav>
    );
};

export default Navbar;
