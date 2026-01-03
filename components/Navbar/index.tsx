import React from 'react';
import Link from 'next/link';
import styles from './style.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar} id="main-navbar">
            <div className={styles.logo}>PR<span style={{ color: 'red' }}>.</span></div>
            <ul className={styles.links}>
                <li><Link href="#about">About</Link></li>
                <li><Link href="#education">Education</Link></li>
                <li><Link href="#skills">Skills</Link></li>
                <li><Link href="#projects">Projects</Link></li>
                <li><Link href="#contact">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
