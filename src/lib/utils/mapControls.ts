import L from "leaflet";
import fa from "$components/icons/CustomIcons";
import type { Feature, Position } from "geojson";
import type { Properties } from "$lib/types/features";
import type { LatLngExpression } from "leaflet";
import { mapTheme } from "$lib/theme";
import restroomSVG from "$assets/free-icons/restroom.svg?raw";
import parkingSVG from "$assets/free-icons/parking.svg?raw";

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000, // in milliseconds
        maximumAge: 0,
      }
    );
  });
}

async function locateMe(
  map: L.Map,
  userLocationMarker: L.Marker | null
): Promise<void> {
  try {
    const position = await getCurrentPosition();
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // Remove existing marker if present
    // BUG: The previous userLocationMarker is not being removed when a new one is created.
    if (userLocationMarker) {
      map.removeLayer(userLocationMarker);
    }

    // Create and store new marker
    userLocationMarker = L.marker([lat, lng], { icon: fa.LocationCrosshairs })
      .addTo(map)
      .bindPopup("<b>You are here!</b><br>Note: Use GPS for better accuracy.")
      .openPopup();

    // Optionally pan to location
    map.panTo([lat, lng], { animate: true, duration: 0.8 });
  } catch (error) {
    console.error("Error getting current position:", error);
    alert(
      "Unable to retrieve your location. Please check your device settings."
    );
  }
}

// This is a ChatGPT implementation of weighted centroid, seems like a wrong implementation
// We'll be using geometric centroid for polygons since it is easier to implement
// https://en.wikipedia.org/wiki/Centroid
function polygonCentroid(coords: Position[]): LatLngExpression {
  let x = 0,
    y = 0,
    area = 0;

  for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
    const [xi, yi] = coords[i];
    const [xj, yj] = coords[j];

    const f = xi * yj - xj * yi;
    area += f;
    x += (xi + xj) * f;
    y += (yi + yj) * f;
  }

  area *= 0.5;
  x /= 6 * area;
  y /= 6 * area;

  // Latitude, longitude
  return [y, x];
}

function geometricCentroid(coordinates: Position[]): [number, number] {
  let x = 0;
  let y = 0;
  const total = coordinates.length;

  for (const [lng, lat] of coordinates) {
    x += lng;
    y += lat;
  }

  const meanLng = x / total;
  const meanLat = y / total;

  // [lat, lng] for Leaflet
  return [meanLat, meanLng];
}

function setBuildings(allbuildings: Feature[]): L.GeoJSON {
  let buildingslayer = L.geoJSON(allbuildings, {
    style: {
      color: mapTheme.building,
      weight: 1,
      fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
      if (feature.geometry.type === "Polygon") {
        const coords: Position[][] = feature.geometry.coordinates;
        const {
          name,
          ["addr:housenumber"]: bldg_no,
          ["building:levels"]: levels,
        }: Properties = feature.properties;

        if (feature.properties && name) {
          let html = `<div class="feature-tooltip building">`;
          html += `<h3 class="tooltip-title">${name}</h3>`;
          html += '<div class="tooltip-content">';
          html += `<div class="tooltip-label">Building</div><div>${bldg_no}</div>`;
          html += `<div class="tooltip-label">Levels</div><div> ${levels}</div>`;
          html += "</div></div>";

          layer.bindTooltip(html, {
            className: "polygon-label", // optional CSS class
          });
        }
      }
    },
  });

  // Add builing numbers
  allbuildings.forEach((feature) => {
    if (feature.geometry.type === "Polygon") {
      const coords: Position[][] = feature.geometry.coordinates;
      const centroid: LatLngExpression = geometricCentroid(coords[0]);
      const { ["addr:housenumber"]: bldg_no } =
        feature.properties as Properties;

      L.marker(centroid, {
        icon: L.divIcon({
          className: "polygon-text",
          html: bldg_no,
        }),
      }).addTo(buildingslayer);
    }
  });

  return buildingslayer;
}

function setBenches(benches: Feature[]): L.GeoJSON {
  return L.geoJSON(benches, {
    style: {
      color: mapTheme.bench,
      weight: 0,
      fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
      if (feature.geometry.type === "Polygon") {
        const coords: Position[][] = feature.geometry.coordinates;
        const {
          ["Estimated Capacity"]: est_capacity,
          ["Has roofing"]: has_roofing,
          ["Has backrest"]: has_backrest,
        }: Properties = feature.properties;

        if (feature.properties && est_capacity) {
          let html = `<div class="feature-tooltip bench">`;
          html += `<h3 class="tooltip-title">Benches</h3>`;
          html += '<div class="tooltip-content">';
          html += `<div class="tooltip-label">Estimated Capacity</div><div> ${est_capacity}</div>`;
          html += `<div class="tooltip-label">Has roofing</div><div> ${has_roofing}</div>`;
          html += `<div class="tooltip-label">Has backrest</div><div> ${has_backrest}</div>`;
          html += "</div></div>";

          layer.bindTooltip(html, {
            className: "polygon-label", // optional CSS class
          });
        }
      }
    },
  });
}

function setParkingSpaces(parkingSpaces: Feature[]): L.GeoJSON {
  let parkingLayer = L.geoJSON(parkingSpaces, {
    style: {
      color: mapTheme.parking,
      weight: 0,
      fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
      if (feature.geometry.type === "Polygon") {
        const coords: Position[][] = feature.geometry.coordinates;
        const { vehicles }: Properties = feature.properties;

        if (feature.properties && vehicles) {
          let html = `<div class="feature-tooltip parking">`;
          html += `<h3 class="tooltip-title">Parking Spaces</h3>`;
          html += '<div class="tooltip-content">';
          html += `<div class="tooltip-label">Vehicles allowed</div><div>${vehicles}</div>`;
          html += "</div></div>";

          layer.bindTooltip(html, {
            className: "polygon-label", // optional CSS class
          });
        }
      }
    },
  });

  parkingSpaces.forEach((feature) => {
    if (feature.geometry.type === "Polygon") {
      const coords: Position[][] = feature.geometry.coordinates;
      const centroid: LatLngExpression = geometricCentroid(coords[0]);

      L.marker(centroid, {
        icon: L.divIcon({
          className: "parking-icon",
          html: `<div class="tooltip-svg">${parkingSVG}</div>`
        }),
      }).addTo(parkingLayer);
    }
  });

  return parkingLayer;
}

function setRestrooms(restrooms: Feature[]): L.GeoJSON {
  let restroomsFiltered = restrooms.filter(
    (feature) => feature.properties!.type === "Restroom"
  );
  return L.geoJSON(restroomsFiltered, {
    pointToLayer: (feature, latlng) => {
      const { description, level }: Properties = feature.properties!;
      let html = `<div class="feature-tooltip restroom">`;
      html += `<h3 class="tooltip-title">Restroom</h3>`;
      html += '<div class="tooltip-content">';
      html += `<div class="tooltip-label">Description</div><div>${description}</div>`;
      html += `<div class="tooltip-label">Level</div><div>${level}</div>`;
      html += "</div></div>";

      return L.marker(latlng, {
        icon: L.divIcon({
          className: "restroom-icon",
          html: `<div class="tooltip-svg">${restroomSVG}</div>`,
        }),
      }).bindTooltip(html, {
        className: "polygon-label", // optional CSS class
      });
    },
  });
}

const controls = {
  getCurrentPosition,
  locateMe,
  geometricCentroid,
  setBuildings,
  setBenches,
  setParkingSpaces,
  setRestrooms,
};

export default controls;

export {
  getCurrentPosition,
  locateMe,
  geometricCentroid,
  setBuildings,
  setBenches,
  setParkingSpaces,
  setRestrooms,
};
