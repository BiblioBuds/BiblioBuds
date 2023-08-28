import styles from './searchbar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.searchbar}>
      <input className={styles.sbsearch} type="text" placeholder="Buscar..." />
      <button className={styles.sbbutton}>🔍</button>
    </div>
  );
};

export default SearchBar;