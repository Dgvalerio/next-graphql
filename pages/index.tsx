import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '@/styles/Home.module.css';

const HomePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Home Page</h1>
      </main>
    </div>
  );
};

export default HomePage;
