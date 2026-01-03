import React from 'react';
import styles from './style.module.css';

const Education = () => {
    return (
        <section className={`section ${styles.educationSection}`} id="education">
            <div className={styles.content}>
                <h2 className={styles.sectionTitle}>Education</h2>
                <div className={styles.timeline}>
                    <div className={styles.item}>
                        <h3>Bachelor of Technology</h3>
                        <span className={styles.date}>2022 - Present</span>
                        <p>Computer Science & Engineering</p>
                        <p className={styles.desc}>Focusing on software development, algorithms, and 3D web technologies.</p>
                    </div>
                    <div className={styles.item}>
                        <h3>High School</h3>
                        <span className={styles.date}>2020 - 2022</span>
                        <p>Science Stream</p>
                        <p className={styles.desc}>Foundation in Physics, Chemistry, and Mathematics.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
