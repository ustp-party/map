import styles from "./Searchbar.module.css";
import SearchIcon from "@/components/material/SearchIcon";

export default function Searchbar() {
  return (
    <div className={styles.searchbar}>
      <input type="text" placeholder="Search..." />
      <SearchIcon />
    </div>
  );
}
