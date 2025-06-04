import "./App.css";
import Map from "./components/Map";
import Searchbar from "./components/searchbar/Searchbar";
import DesktopSidebar from "./components/sidebar/DesktopSidebar";
import { useState, useEffect } from "react";

// Custom hook for viewport width
function useViewportWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function App() {
  const vpWidth = useViewportWidth();
  const [detailsOpen, setDetailsOpen] = useState(false);

  const sidebarClass = [
    "sidebar-container",
    detailsOpen && "open"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="App">
      <div className="container">
        <div className="searchbar-container">
          <Searchbar />
        </div>

        {vpWidth > 600 && (
          <div className={sidebarClass}>
            <DesktopSidebar />
          </div>
        )}

        <div className="map-wrapper">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
