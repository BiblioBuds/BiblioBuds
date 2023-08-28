"use client";
import styles from './home.module.css';
import PromoCarousel from '@/components/Carrusel/carrusel';
import Card from '@/components/cards/card';

export const Home = () => {
   // Obtén el estado global de libros

  // Filtra los 6 libros principales


  return (
    <div className={styles.main}>
        <header>
          <h1 className={styles.hometitle}>For You</h1>
        </header>
        <PromoCarousel />
        <section className={styles.popular}>
          <h3 className={styles.popularpad}>Popular</h3>
          
          <div className={styles.cardContainer}>
            <Card></Card>
          </div>
        </section>
    </div>
  )
}

export default Home;
