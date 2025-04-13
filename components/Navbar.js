import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/">Home</Link>
        </li>

        <div className={styles.spacer}></div>

        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/collection">Collection</Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/admin">Admin</Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/admin/create">Add Book</Link>
        </li>
      </ul>
    </nav>
  );
}
