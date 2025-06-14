import L from "leaflet";

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
    if (userLocationMarker) {
      map.removeLayer(userLocationMarker);
    }

    // Create and store new marker
    userLocationMarker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup("<b>You are here!</b><br>Note: Using Wi-Fi or Ethernet has lower accuracy.")
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

const controls = {
  locateMe,
};

export default controls;

export { getCurrentPosition, locateMe };
