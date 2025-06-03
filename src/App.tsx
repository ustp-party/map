import "./App.css";
import Map from "./components/Map";
import Searchbar from "./components/searchbar/Searchbar";

function App() {
  return (
    <div className="App">
      <div className="searchbar-container">
        <Searchbar />
      </div>
      <div className="map-wrapper">
        <Map />
      </div>
    </div>
  );
}

export default App;
