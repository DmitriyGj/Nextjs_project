import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { withLayout } from '../public/src/HOC/Layout/Layout';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Hi, Bob</h1>
    </div>
  );
};

export default withLayout(Home);