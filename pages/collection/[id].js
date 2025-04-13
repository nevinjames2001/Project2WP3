import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function BookDetail({ book }) {
  if (!book || book.error) {
    return (
      <div className={styles.container}>
        <p>No book found with the given ID.</p>
        <Link className={styles.link} href="/collection"> Back to Collection</Link>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles.pageCenter}`}>
      <Link className={styles.link} href="/collection"> Back to Collection</Link>
      <h1>{book.title}</h1>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td><strong>ID</strong></td>
            <td>{book.id}</td>
          </tr>
          <tr>
            <td><strong>Title</strong></td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <td><strong>Author</strong></td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <td><strong>Pages</strong></td>
            <td>{book.pages}</td>
          </tr>
          <tr>
            <td><strong>Genre</strong></td>
            <td>{book.genre}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:4000/books?_limit=10');
  const books = await res.json();

  const paths = books.map(book => ({
    params: { id: book.id.toString() }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:4000/books/${id}`);

  if (!res.ok) {
    return { props: { book: null }, revalidate: 10 };
  }

  const book = await res.json();

  return {
    props: { book },
    revalidate: 10
  };
}
