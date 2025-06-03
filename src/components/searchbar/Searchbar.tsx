import './Searchbar.css';

export default function Searchbar() {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search..."
      />
    <span className="material-symbols-outlined search">search</span>
    </div>
  );
}
