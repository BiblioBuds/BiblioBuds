import styles from './searchbar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.searchbar}>
      <input className={styles.sbsearch} type="text" placeholder="Search books" />
      <button className={styles.sbbutton}>🔍</button>
    </div>
  );
};

export default SearchBar;