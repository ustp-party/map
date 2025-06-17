import L from "leaflet";
import fa from "$components/icons/CustomIcons";
import type { Position } from "geojson";
import type { LatLngExpression } from "leaflet";

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

const controls = {
  getCurrentPosition,
  locateMe,
  polygonCentroid,
};

export default controls;

export { getCurrentPosition, locateMe, polygonCentroid };
