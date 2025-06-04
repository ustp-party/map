import { prefersDarkMode } from "@utils/theme";
import searchDark from "@assets/material/search-24-dark.svg";
import searchLight from "@assets/material/search-24-light.svg";

// TODO: Find a way to make this component more dynamic
// less boilerplate hardcoded icon importing
export default function SearchIcon() {
  if (prefersDarkMode()) {
    return (
      <img
        src={searchDark}
        alt="Search"
        className="material-icons"
        style={{ width: "24px", height: "24px" }}
      />
    );
  }
  console.log("Using light mode search icon");

  return (
    <img
      src={searchLight}
      alt="Search"
      className="material-icons"
      style={{ width: "24px", height: "24px" }}
    />
  );
}
