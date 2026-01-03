import React from 'react';
import styles from './style.module.css';

const Skills = () => {
    const skills = [
        "React", "Next.js", "Three.js", "TypeScript",
        "JavaScript", "HTML5", "CSS3", "GSAP",
        "Tailwind", "Git", "Node.js", "Python"
    ];

    return (
        <section className={`section ${styles.skillsSection}`} id="skills">
            <div className={styles.content}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                <div className={styles.cloud}>
                    {skills.map((skill, index) => (
                        <span key={index} className={styles.tag}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
