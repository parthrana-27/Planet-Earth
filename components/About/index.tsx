import React from 'react';
import styles from './style.module.css';

const About = () => {
    return (
        <section className={`section ${styles.aboutSection}`} id="about">
            <div className={styles.content}>
                <h2 className={styles.sectionTitle}>About Me</h2>
                <div className={styles.grid}>
                    <div className={styles.text}>
                        <p>
                            Hello! I'm Parth Rana, a passionate developer with a love for creating
                            immersive web experiences. My journey in tech is driven by curiosity
                            and a desire to build things that make a difference.
                        </p>
                        <p>
                            I specialize in front-end development, 3D web graphics, and
                            interactive design. When I'm not coding, you can find me exploring
                            new technologies or gazing at the stars.
                        </p>
                    </div>
                    {/* Placeholder for photo found in assets or will be added later by user */}
                    <div className={styles.photo}>
                        <div className={styles.photoPlaceholder}>
                            <span>My Photo</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
