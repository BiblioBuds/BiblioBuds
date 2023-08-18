import styles from './searchbar.module.css';

const SearchBar = () =>{
    return(
        <div className={styles.sbinput}>
            <input className={styles.sbsearch}/>
        </div>
    )
}
export default SearchBar;