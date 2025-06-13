import L from "leaflet";

function buildings(map: L.Map, base_url: string) {
  fetch(`${base_url}/data/ustp-buildings.geojson`)
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        style: {
          color: "#5790fc",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.4,
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          if (props) {
            layer.bindPopup(`Name: ${props.name}`);
          }
        },
      }).addTo(map!);
    })
    .catch((err) => console.error("Failed to load GeoJSON:", err));
}

function benches(map: L.Map, base_url: string) {
  fetch(`${base_url}/data/benches.geojson`)
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        style: {
          color: "#e42536",
          weight: 0,
          opacity: 1,
          fillOpacity: 0.4,
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          if (props) {
            layer.bindPopup(`Name: ${props.name}`);
          }
        },
      }).addTo(map!);
    })
    .catch((err) => console.error("Failed to load GeoJSON:", err));
}

function parking(map: L.Map, base_url: string) {
  fetch(`${base_url}/data/parking-spaces.geojson`)
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        style: {
          color: "#964a8b",
          weight: 0,
          opacity: 1,
          fillOpacity: 0.4,
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          if (props) {
            layer.bindPopup(`Name: ${props.name}`);
          }
        },
      }).addTo(map!);
    })
    .catch((err) => console.error("Failed to load GeoJSON:", err));
}

function pointsOfInterest(map: L.Map, base_url: string) {
  fetch(`${base_url}/data/points-of-interest.geojson`)
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 8,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1,
          });
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          if (props) {
            layer.bindPopup(`Name: ${props.name}`);
          }
        },
      }).addTo(map!);
    })
    .catch((err) => console.error("Failed to load GeoJSON:", err));
}

const features = {
  buildings: buildings,
  benches: benches,
  parking: parking,
  pointsOfInterest: pointsOfInterest,
};

export default features;

export type FeatureType = keyof typeof features;
