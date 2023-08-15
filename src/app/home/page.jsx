import styles from './home.module.css';

export const Home = () => {
  return (
    <div className={styles.main}>
        <header>
          <h1>BiblioBuds</h1>
        </header>
        <section>
          <h3>Popular</h3>
          {/* acá vn las cards de los má revisados */}
        </section>
        <section>
          {/* acá van las cards de los libros */}
        </section>
    </div>
  )
}
export default Home;