'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Award, Search, X, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import Image from 'next/image';

const Certifications = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [selectedCert, setSelectedCert] = useState<number | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
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

    const certifications = [
        {
            title: "Problem Solving (Basic)",
            issuer: "HackerRank",
            date: "Jan 2026",
            credentialId: "602341B61DEF",
            skills: ["Data Structures", "Algorithms"],
            image: "/certs/problem-solving.png"
        },
        {
            title: "SQL (Basic)",
            issuer: "HackerRank",
            date: "Jan 2026",
            credentialId: "0BE25B959B6D",
            skills: ["Relational DBs", "Query Optimization"],
            image: "/certs/sql.png"
        },
        {
            title: "MongoDB and the Document Model",
            issuer: "MongoDB",
            date: "Feb 2026",
            credentialId: "MDB1gjfjawbqv",
            skills: ["NoSQL", "Data Modeling", "Aggregation"],
            image: "/certs/mongodb.png"
        },
        {
            title: "Disaster Risk Monitoring Using Satellite Imagery",
            issuer: "NVIDIA Deep Learning Institute",
            date: "Jan 2026",
            credentialId: "0WXYJ6WCQOa52VW7Ku2Naw",
            skills: ["Computer Vision", "Satellite AI"],
            image: "/certs/nvidia.png"
        },
        {
            title: "OpenCV Certification",
            issuer: "OpenCV University",
            date: "Sep 2024",
            credentialId: "2d15b3c298f04b0786ea35a1aa6fc40a",
            skills: ["Image Processing", "Feature Extraction"],
            image: "/certs/opencv.png"
        }
    ];

    const openModal = (idx: number) => {
        setSelectedCert(idx);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedCert(null);
        document.body.style.overflow = 'unset';
    };

    const nextCert = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedCert !== null) {
            setSelectedCert((selectedCert + 1) % certifications.length);
        }
    };

    const prevCert = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedCert !== null) {
            setSelectedCert((selectedCert - 1 + certifications.length) % certifications.length);
        }
    };

    const copyToClipboard = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center px-[5%] md:px-[10%] py-28 z-10 overflow-hidden"
            id="certifications"
        >
            {/* Ambient Background Lighting */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ambient-glow-indigo rounded-full pointer-events-none blur-3xl -z-10" />

            {/* Oversized Section Marker */}
            <div className="section-watermark top-10 right-4 md:right-12 text-[140px] md:text-[220px]">
                04.
            </div>

            <div className="w-full max-w-6xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-indigo-400/90 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                            Verified Credentials
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-indigo-100/90 to-neutral-500 bg-clip-text text-transparent">
                        Certifications
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
                        Industry-recognized accreditations in computer vision, deep learning, algorithms, and distributed databases.
                    </p>
                </div>

                {/* Cards Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, idx) => (
                        <div
                            key={idx}
                            data-cursor="VIEW"
                            className="group relative p-6 rounded-3xl border border-white/10 bg-neutral-950/40 backdrop-blur-xl hover:bg-neutral-900/60 hover:border-blue-500/30 transition-all duration-300 flex flex-col overflow-hidden sm:min-h-[420px] cursor-pointer shadow-2xl"
                            onClick={() => openModal(idx)}
                        >
                            {/* Inner Ambient Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-colors pointer-events-none" />

                            {/* Thumbnail Container */}
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-neutral-950 border border-white/10 group-hover:border-blue-500/30 transition-all">
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                                    <div className="p-3 rounded-full bg-blue-400/20 border border-blue-400/40 text-blue-300 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                                        <Search size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 flex-grow flex flex-col">
                                <div className="flex items-center justify-between mb-2.5">
                                    <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-blue-400">
                                        {cert.issuer}
                                    </span>
                                    <span className="text-[10px] font-mono text-neutral-400">
                                        {cert.date}
                                    </span>
                                </div>

                                <h3 className="text-base md:text-lg font-bold text-white mb-3 group-hover:text-blue-200 transition-colors leading-snug">
                                    {cert.title}
                                </h3>

                                {cert.skills && (
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {cert.skills.map((skill, sIdx) => (
                                            <span
                                                key={sIdx}
                                                className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-neutral-300"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                                    {cert.credentialId ? (
                                        <button
                                            onClick={(e) => copyToClipboard(e, cert.credentialId)}
                                            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors group/btn"
                                            title="Click to copy credential ID"
                                        >
                                            <span className="text-[9px] font-mono text-neutral-400">ID: {cert.credentialId.slice(0, 10)}...</span>
                                            {copiedId === cert.credentialId ? (
                                                <Check size={12} className="text-blue-400" />
                                            ) : (
                                                <Copy size={12} className="opacity-60 group-hover/btn:opacity-100" />
                                            )}
                                        </button>
                                    ) : <div />}
                                    <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1 group-hover:text-blue-300 transition-colors">
                                        Inspect <ExternalLink size={10} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedCert !== null && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300"
                    onClick={closeModal}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all z-[210] border border-white/15"
                    >
                        <X size={24} />
                    </button>

                    <button
                        onClick={prevCert}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all z-[210] hidden md:block border border-white/15"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        onClick={nextCert}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all z-[210] hidden md:block border border-white/15"
                    >
                        <ChevronRight size={28} />
                    </button>

                    <div
                        className="relative w-full max-w-3xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-neutral-950"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={certifications[selectedCert].image}
                            alt={certifications[selectedCert].title}
                            fill
                            className="object-contain"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <p className="text-blue-400 text-xs uppercase tracking-[0.2em] font-mono font-bold mb-1.5">
                                {certifications[selectedCert].issuer} • {certifications[selectedCert].date}
                            </p>
                            <h2 className="text-white text-xl md:text-2xl font-bold">
                                {certifications[selectedCert].title}
                            </h2>
                            {certifications[selectedCert].credentialId && (
                                <p className="text-neutral-400 text-xs font-mono mt-1">
                                    Credential ID: {certifications[selectedCert].credentialId}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>

    );
};

export default Certifications;

