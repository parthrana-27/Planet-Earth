'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from "@/lib/utils";

const greetings = [
    "Hello",
    "नमस्ते",
    "Hola",
    "Bonjour",
    "Ciao",
    "你好",
    "こんにちわ",
    "నమస్కారం",
    "வணக்கம்",
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ"
];

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                }
            });

            gsap.set(textRefs.current, { opacity: 0, y: 20 });

            textRefs.current.forEach((el, i) => {
                if (!el) return;
                tl.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.15,
                    ease: "power1.out",
                })
                    .to(el, {
                        opacity: 0,
                        y: -20,
                        duration: 0.1,
                        ease: "power2.in",
                    }, "+=0.15");
            });

            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut",
            });

            tl.timeScale(1.5);
        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
            suppressHydrationWarning
        >
            <div className="relative text-center h-20 flex items-center justify-center">
                {greetings.map((greet, index) => (
                    <span
                        key={index}
                        className="absolute text-2xl md:text-5xl font-black text-black tracking-tighter opacity-0"
                        ref={(el: HTMLSpanElement | null) => {
                            if (textRefs.current) {
                                textRefs.current[index] = el;
                            }
                        }}
                    >
                        {greet}
                    </span>
                ))}
            </div>
        </div>
    );
}
