import Head from "next/head";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';


export default function Home() {
    const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };
  return (
    <>
      <Head>
        <title>Project 2 Advanced Web Programming</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.pageCenter}`}
      >
        <h1 className={styles.header}>Book Collection</h1>

         <p className={styles.description}>
            This application allows you to easily manage your personal book collection. 
            Browse your library, view details of individual books, and perform administrative tasks such as adding, editing, or removing books.
          </p>

          <div className={styles.actions}>
            <button 
              className={styles.button} 
              onClick={() => handleNavigate('/collection')}
            >
              Browse Collection
            </button>
            <button 
              className={styles.button} 
              onClick={() => handleNavigate('/admin/create')}
            >
              + Add New Book
            </button>
          </div>

      </div>
    </>
  );
}
