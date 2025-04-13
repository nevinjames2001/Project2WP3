import styles from '../styles/Footbar.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Book Collection App. All rights reserved.</p>
    </footer>
  );
}
