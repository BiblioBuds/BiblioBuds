import styles from './home.module.css';
import Card from '@/components/cards/card';

export const Home = () => {
  return (
    <div className={styles.main}>
        <header>
          <h1 className={styles.hometitle}>BiblioBuds</h1>
        </header>
        <section className={styles.popular}>
          <h3 className={styles.popularpad}>Popular</h3>
          <Card/>
        </section>
        <section className={styles.cards}>
          <Card/>
        </section>
    </div>
  )
}
export default Home;