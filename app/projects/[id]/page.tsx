import React from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import Navbar from '@/components/Navbar'; // We can reuse navbar
import styles from './style.module.css';

// params is a Promise in Next.js 15+ 
// But in Next 14 it's just props.params. 
// Assuming Next.js 15 based on "next": "16.1.1" in package.json (wait, 16 doesn't exist yet, likely 15 or typo in user context, assuming 15/canary).
// Actually package.json said "next": "16.1.1", which is likely a future version or user's custom setup. 
// I will treat params as a Promise to be safe for newer versions.

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projects.find(p => p.id === id);

    if (!project) {
        return <div className={styles.error}>Project not found</div>;
    }

    return (
        <>
            <Navbar />
            <main className={styles.container}>
                <div className={styles.hero}>
                    <h1>{project.title}</h1>
                    <p className={styles.desc}>{project.description}</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.imagePlaceholder}>
                        {/* <img src={project.image} alt={project.title} /> */}
                        <span>Project Image {project.image}</span>
                    </div>

                    <div className={styles.details}>
                        <h2>Overview</h2>
                        <p>{project.content}</p>

                        <div className={styles.techStack}>
                            <h3>Technologies</h3>
                            <ul>
                                {project.technologies.map(tech => (
                                    <li key={tech}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Link href="/#projects" className={styles.backBtn}>
                        ← Back to Projects
                    </Link>
                </div>
            </main>
        </>
    );
}

// Generate static params if needed, but dynamic is fine for now
export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }))
}
