import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function CreateBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    pages: '',
    genre: '',
  });
  const router = useRouter();
  const [errors, setErrors] = useState([]);

   const validate = () => {
    const validationErrors = [];
    const validGenres = [
      "Fiction",
      "Non-Fiction",
      "Science Fiction",
      "Fantasy",
      "Biography",
      "Mystery"
    ];

    if (book.title.length < 2 || book.title.length > 50) {
      validationErrors.push("Book title must be between 2 and 50 characters");
    }

    const pagesNum = parseInt(book.pages);
    if (isNaN(pagesNum) || pagesNum <= 10 || pagesNum > 2000) {
      validationErrors.push("Number of pages must be greater than 10 and no more than 2000.");
    }

    if (!validGenres.includes(book.genre)) {
      validationErrors.push("Genre must be either ‘Fiction’,’Non-Fiction’,’Science Fiction’,’Fantasy’,’Biography’ or ‘Mystery’");
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

     // 1. Get all books to determine the current highest ID
    const res = await fetch('http://localhost:4000/books');
    const existingBooks = await res.json();

    // 2. Find the highest ID (assumes books have numeric IDs)
    const maxId = existingBooks.reduce((max, book) => book.id > max ? book.id : max, 0);
      const nextIdNum = parseInt(maxId) + 1;
      const nextId = nextIdNum.toString();


    await fetch('http://localhost:4000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: nextId,
        title: book.title,
        author: book.author,
        pages: parseInt(book.pages),
        genre: book.genre
      })
    });

    router.push('/admin');
  };

  return (
    <div className={`${styles.container} ${styles.pageCenter}`}>
    <Link className={styles.link} href="/admin">
        Back to Admin
    </Link>
      <h2>Add New Book</h2>

       {errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((error, i) => (
            <li key={i} style={{color:'red'}}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>

        <input
          className={styles.formInput}
          placeholder="Title"
          required
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
        /><br/><br/>

        <input
          className={styles.formInput}
          placeholder="Author"
          required
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
        /><br/><br/>

        <input
          className={styles.formInput}
          placeholder="Pages"
          type="number"
          required
          value={book.pages}
          onChange={(e) => setBook({ ...book, pages: e.target.value })}
        /><br/><br/>

        <select
          className={styles.formInput}
          value={book.genre}
          onChange={(e) => setBook({ ...book, genre: e.target.value })}
          required
        >
          <option value="">Select Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
          <option value="Mystery">Mystery</option>
        </select>
        <br/><br/>

        <button className={styles.button} style={{ marginLeft: '54%' }} type="submit">Create</button>
      </form>
    </div>
  );
}
