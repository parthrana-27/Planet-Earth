import React from 'react';
import Link from 'next/link';
import styles from './style.module.css';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "Project Alpha",
            desc: "A futuristic dashboard interface.",
            // image: "/projects/1.jpg" // Placeholder
        },
        {
            id: 2,
            title: "Project Beta",
            desc: "E-commerce platform with 3D product view.",
        },
        {
            id: 3,
            title: "Project Gamma",
            desc: "AI-powered chat application.",
        }
    ];

    return (
        <section className={`section ${styles.projectsSection}`} id="projects">
            <div className={styles.content}>
                <h2 className={styles.sectionTitle}>Projects</h2>
                <div className={styles.grid}>
                    {projects.map((project) => (
                        <div key={project.id} className={styles.card}>
                            <div className={styles.imagePlaceholder}>
                                <span>Preview Image</span>
                            </div>
                            <h3>{project.title}</h3>
                            <p>{project.desc}</p>
                            <Link href={`/projects/${project.id}`} className={styles.btn}>
                                Read More
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
