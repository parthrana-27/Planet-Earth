import React from 'react';
import styles from './style.module.css';

const Contact = () => {
    return (
        <section className={`section ${styles.contactSection}`} id="contact">
            <div className={styles.content}>
                <h2 className={styles.sectionTitle}>Contact Me</h2>

                <div className={styles.container}>
                    <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className={styles.form}>
                        <div className={styles.group}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className={styles.group}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className={styles.group}>
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows={4} required></textarea>
                        </div>
                        <button type="submit" className={styles.submit}>Send Message</button>
                    </form>


                </div>
            </div>
        </section>
    );
};

export default Contact;
