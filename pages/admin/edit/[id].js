import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../styles/Home.module.css';

export default function EditBook({ book }) {
  const [updatedBook, setUpdatedBook] = useState(book);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const validate = () => {
    const errs = [];
    if (updatedBook.title.length < 2 || updatedBook.title.length > 50)
      errs.push("Title must be between 2 and 50 characters.");
    if (updatedBook.pages <= 10 || updatedBook.pages > 2000)
      errs.push("Pages must be greater than 10 and no more than 2000.");
    const validGenres = ["Fiction", "Non-fiction", "Science Fiction", "Fantasy", "Biography", "Mystery"];
    if (!validGenres.includes(updatedBook.genre))
      errs.push("Genre must be either ‘Fiction’,’Non-Fiction’,’Science Fiction’,’Fantasy’,’Biography’ or ‘Mystery’");

    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await fetch(`http://localhost:4000/books/${book.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updatedBook, pages: parseInt(updatedBook.pages) })
    });

    router.push('/admin');
  };

  return (
    <div className={`${styles.container} ${styles.pageCenter}`}>
      <Link className={styles.link} href="/admin">Back to Admin</Link>
      <h2>Edit Book</h2>
      
      {errors.length > 0 && (
        <ul>
          {errors.map((err, i) => <li key={i} style={{color:'red'}}>{err}</li>)}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <input className={styles.formInput} value={updatedBook.title} onChange={(e)=>setUpdatedBook({...updatedBook,title:e.target.value})}/><br/><br/>
        <input className={styles.formInput} value={updatedBook.author} onChange={(e)=>setUpdatedBook({...updatedBook,author:e.target.value})}/><br/><br/>
        <input className={styles.formInput} type="number" value={updatedBook.pages} onChange={(e)=>setUpdatedBook({...updatedBook,pages:e.target.value})}/><br/><br/>
        <input className={styles.formInput} value={updatedBook.genre} onChange={(e)=>setUpdatedBook({...updatedBook,genre:e.target.value})}/><br/><br/>
        <button className={styles.button} style={{marginLeft:'55%'}} type="submit">Update</button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:4000/books/${id}`);
  const book = await res.json();

  return { props: { book } };
}
