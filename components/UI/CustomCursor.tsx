'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [cursorText, setCursorText] = useState('');
    const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text'>('default');
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;

            const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
            if (cursorTarget) {
                const label = cursorTarget.getAttribute('data-cursor');
                if (label) {
                    setCursorText(label);
                    setCursorVariant('text');
                    return;
                }
            }

            const isInteractive = target.closest('a, button, [role="button"], input, textarea, select');
            if (isInteractive) {
                setCursorText('');
                setCursorVariant('hover');
            } else {
                setCursorText('');
                setCursorVariant('default');
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseover', handleOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseover', handleOver);
        };
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
            {/* Center Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white mix-blend-difference pointer-events-none"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: cursorVariant === 'text' ? 0 : cursorVariant === 'hover' ? 1.5 : 1,
                    opacity: cursorVariant === 'text' ? 0 : 1,
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Outer Follower Ring / Badge */}
            <motion.div
                className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none font-bold text-[10px] tracking-wider uppercase backdrop-blur-sm"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: cursorVariant === 'text' ? 70 : cursorVariant === 'hover' ? 44 : 28,
                    height: cursorVariant === 'text' ? 70 : cursorVariant === 'hover' ? 44 : 28,
                    backgroundColor: cursorVariant === 'text' ? 'rgba(255, 255, 255, 0.95)' : cursorVariant === 'hover' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    border: cursorVariant === 'text' ? 'none' : cursorVariant === 'hover' ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: cursorVariant === 'text' ? '#000000' : '#ffffff',
                }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
                {cursorVariant === 'text' && (
                    <span className="font-black text-[9px] tracking-widest text-black">
                        {cursorText}
                    </span>
                )}
            </motion.div>
        </div>
    );
};

export default CustomCursor;
