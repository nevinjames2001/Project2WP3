import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';

export default function Admin({ books }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/books/${id}`, {
      method: 'DELETE',
    });
    router.replace(router.asPath);
    window.location.reload();
  };

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className={`${styles.container} ${styles.pageCenter}`}>
      <h1>Admin Panel</h1>
        <button 
        className={styles.button} style={{ marginLeft: '70%' }}
              onClick={() => handleNavigate('/admin/create')}
            >
              + Add New Book
        </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Genre</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.pages}</td>
              <td>{book.genre}</td>
              <td>
                <Link className={styles.link} href={`/admin/edit/${book.id}`}>E</Link>
              </td>
              <td>
                <button onClick={() => handleDelete(book.id)}>D</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/books');
  const books = await res.json();

  return { props: { books } };
}
