import Link from 'next/link';
import styles from "@/styles/Home.module.css";

export default function Collection({ books }) {
  return (
    <div className={styles.pageCenter}>
      <h1>Book Collection</h1>
      <ul className={styles.bookList}>
        {books.map(book => (
          <li key={book.id} className={styles.bookItem}>
            <p><strong>ID:</strong> {book.id}</p>
            <p><strong>Title:</strong> {book.title}</p>
            <Link href={`/collection/${book.id}`} className={styles.link}>
              More
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/books');
  const books = await res.json();

  return { props: { books } };
}
