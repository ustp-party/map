import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const { VITE_MAP_URL } = import.meta.env;

export default function Map() {
  return (
    <>
      <MapContainer
        center={[8.484975, 124.656662]}
        zoom={19}
        // Setting this to false right now, maximum zoom is 19
        zoomControl={false}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url={VITE_MAP_URL}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </>
  );
}
