import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Award, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Certifications = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [selectedCert, setSelectedCert] = useState<number | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { opacity: 0, scale: 0.9, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
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

    const certifications = [
        {
            title: "MongoDB and the Document Model",
            issuer: "MongoDB",
            date: "Feb 2026",
            credentialId: "MDB1gjfjawbqv",
            image: "/certs/mongodb.png"
        },
        {
            title: "Disaster Risk Monitoring Using Satellite Imagery",
            issuer: "NVIDIA",
            date: "Jan 2026",
            credentialId: "0WXYJ6WCQOa52VW7Ku2Naw",
            skills: ["Computer Vision"],
            image: "/certs/nvidia.png"
        },
        {
            title: "SQL (Basic)",
            issuer: "HackerRank",
            date: "Oct 2024",
            credentialId: "0BE25B959B6D",
            image: "/certs/hackerrank_sql.png"
        },
        {
            title: "OpenCV",
            issuer: "OpenCV University",
            date: "Sep 2024",
            credentialId: "2d15b3c298f04b0786ea35a1aa6fc40a",
            skills: ["Image Processing", "Computer Vision"],
            image: "/certs/opencv.png"
        },
        {
            title: "Web with ml",
            issuer: "GDG onCampus | Nirma University",
            date: "Nov 2023",
            skills: ["Machine Learning"],
            image: "/certs/gdg_ml.png"
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

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center px-[5%] md:px-[10%] py-20 z-10"
            id="certifications"
        >
            <div className="w-full max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent inline-block">
                        Certifications
                    </h2>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, idx) => (
                        <div
                            key={idx}
                            className="group relative p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 flex flex-col overflow-hidden sm:min-h-[400px] cursor-pointer"
                            onClick={() => openModal(idx)}
                        >
                            {/* Thumbnail Container */}
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 group/thumb">
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <div className="p-3 rounded-full bg-white/20 border border-white/40 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <Search size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 flex-grow flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] uppercase tracking-widest font-black text-white/40">
                                        {cert.issuer}
                                    </span>
                                    <span className="text-[10px] font-bold text-white/20">
                                        {cert.date}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-100 transition-colors leading-tight">
                                    {cert.title}
                                </h3>
                                {cert.skills && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {cert.skills.map((skill, sIdx) => (
                                            <span key={sIdx} className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/50">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    {cert.credentialId ? (
                                        <div className="flex flex-col">
                                            <span className="text-[8px] uppercase tracking-tighter text-white/30">ID</span>
                                            <span className="text-[10px] font-mono text-white/50">{cert.credentialId}</span>
                                        </div>
                                    ) : <div />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedCert !== null && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300"
                    onClick={closeModal}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all z-[210]"
                    >
                        <X size={28} />
                    </button>

                    <button
                        onClick={prevCert}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all z-[210] hidden md:block"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={nextCert}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all z-[210] hidden md:block"
                    >
                        <ChevronRight size={32} />
                    </button>

                    <div
                        className="relative w-full max-w-5xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={certifications[selectedCert].image}
                            alt={certifications[selectedCert].title}
                            fill
                            className="object-contain bg-neutral-900"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-black mb-2">
                                {certifications[selectedCert].issuer}
                            </p>
                            <h2 className="text-white text-2xl md:text-3xl font-bold">
                                {certifications[selectedCert].title}
                            </h2>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certifications;
