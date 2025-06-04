import styles from "./Searchbar.module.css";

export default function Searchbar() {
  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        placeholder="Search..."
      />
    <span className="material-symbols-outlined search">search</span>
    </div>
  );
}
