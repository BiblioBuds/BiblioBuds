import styles from './home.module.css';
import Card from '@/components/cards/card';

export const Home = () => {
  return (
    <div className={styles.main}>
        <header>
          <h1>BiblioBuds</h1>
        </header>
        <section className={styles.popular}>
          <h3>Popular</h3>
          {/* acá vn las cards de los má revisados */}
        </section>
        <section className={styles.cards}>
          <Card/>
        </section>
    </div>
  )
}
export default Home;