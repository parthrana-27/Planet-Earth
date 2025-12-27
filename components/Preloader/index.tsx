'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './style.module.css';

const greetings = [
    "Hello",
    "नमस्ते",
    "নমস্কার",
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
            // Curtain reveal effect
            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                }
            });

            // Cycle greetings
            gsap.set(textRefs.current, { autoAlpha: 0, y: 10 });
            textRefs.current.forEach((el, i) => {
                if (!el) return;
                tl.to(el, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.1,
                    ease: "power2.out",
                })
                    .to(el, {
                        autoAlpha: 0,
                        y: -10,
                        duration: 0.4,
                        ease: "power2.in",
                    }, "+=0.2");
            });

            // Slide up to reveal
            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
            });

            tl.timeScale(1.8);
        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef} suppressHydrationWarning>
            <div className={styles.textContainer}>
                {greetings.map((greet, index) => (
                    <span
                        key={index}
                        className={styles.greeting}
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
