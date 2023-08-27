"use client";
import styles from './home.module.css';
import PromoCarousel from '@/components/Carrusel/carrusel';
import Card from '@/components/cards/card';
import { useGlobalContext } from "../Context/store"; // Asegúrate de importar correctamente el contexto

export const Home = () => {
  const { books } = useGlobalContext(); // Obtén el estado global de libros

  // Filtra los 6 libros principales
  const mainBooks = books.slice(0, 6);

  return (
    <div className={styles.main}>
        <header>
          <h1 className={styles.hometitle}>BiblioBuds</h1>
        </header>
        <PromoCarousel />
        <section className={styles.popular}>
          <h3 className={styles.popularpad}>Popular</h3>
          <div className={styles.cardContainer}>
            {mainBooks.map((book) => (
              <Card key={book.id} book={book} />
            ))}
          </div>
        </section>
    </div>
  )
}

export default Home;
