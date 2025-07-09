import L from "leaflet";
import icons from "$components/icons/CustomIcons";
import type { Feature, Position } from "geojson";
import type { Properties } from "$lib/types/features";
import type { LatLngExpression } from "leaflet";
import { mapTheme } from "$lib/theme";
import "leaflet.markercluster";

function tooltipTemplate(
  title: string,
  type: string,
  labels: Record<string, string | undefined>
): string {
  const content = Object.entries(labels)
    .map(
      ([key, value]) =>
        `<div class="tooltip-label">${key}</div><div>${value}</div>`
    )
    .join("");

  return `
    <div class="feature-tooltip ${type.toLowerCase().replace(/\s+/g, "-")}">
      <h3 class="tooltip-title">${title}</h3>
      <div class="tooltip-content">
        ${content}
      </div>
    </div>
  `.trim();
}

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
    userLocationMarker = L.marker([lat, lng], {
      icon: icons.LocationCrosshairs,
    })
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

function setBuildings(
  allbuildings: Feature[],
  callback: Function,
  darkMode: boolean = false,
  enableLabels: boolean = true
): L.FeatureGroup {
  let buildingslayer = L.geoJSON(allbuildings, {
    style: {
      color: mapTheme.building,
      weight: 1,
      fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
      const { name, type }: Properties = feature.properties;
      const labels = labelBuilder(feature.properties!);
      layer
        .bindTooltip(tooltipTemplate(name, type, labels), {
          className: "polygon-label", // optional CSS class
        })
        .on("click", () => {
          callback(feature);
        });
    },
  });

  if (enableLabels) {
    const clusterGroup = L.markerClusterGroup({
      showCoverageOnHover: true,
      maxClusterRadius: 50,
      iconCreateFunction: (cluster) => {
        const markersCount = cluster.getChildCount();
        return L.divIcon({
          html: `<div><div>${markersCount}</div></div>`,
          className: "cluster-icon",
          iconSize: L.point(32, 32),
          iconAnchor: L.point(16, 16),
        });
      },
    });

    allbuildings.forEach((feature) => {
      if (feature.geometry.type === "Polygon") {
        const coords: Position[][] = feature.geometry.coordinates;
        const centroid: LatLngExpression = geometricCentroid(coords[0]);
        const { name, ["addr:housenumber"]: number } =
          feature.properties as Properties;

        let className = "polygon-text ";
        className += darkMode ? "dark" : "";
        const marker = L.marker(centroid, {
          icon: L.divIcon({
            className: className,
            html: `(${number}) ${name}`,
            iconSize: L.point(100, 30), // Adjust size as needed
          }),
        });

        clusterGroup.addLayer(marker);
      }
    });
    return L.featureGroup([buildingslayer, clusterGroup]);
  }

  return L.featureGroup([buildingslayer]);
}

function setBenches(benches: Feature[], callback: Function): L.GeoJSON {
  return L.geoJSON(benches, {
    style: {
      color: mapTheme.bench,
      weight: 0,
      fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
      const { name, type }: Properties = feature.properties;
      const labels = labelBuilder(feature.properties!);
      layer
        .bindTooltip(tooltipTemplate(name, type, labels), {
          className: "polygon-label",
        })
        .on("click", () => {
          callback(feature);
        });
    },
  });
}

function setParkingSpaces(
  parkingSpaces: Feature[],
  callback: Function
): L.GeoJSON {
  let parkingLayer = L.geoJSON(parkingSpaces, {
    style: {
      color: mapTheme.parking,
      weight: 0,
      fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
      if (feature.geometry.type === "Polygon") {
        const { name, type }: Properties = feature.properties;
        const labels = labelBuilder(feature.properties!);
        layer
          .bindTooltip(tooltipTemplate(name, type, labels), {
            className: "polygon-label",
          })
          .on("click", () => {
            callback(feature);
          });
      }
    },
  });

  // parkingSpaces.forEach((feature) => {
  //   if (feature.geometry.type === "Polygon") {
  //     const coords: Position[][] = feature.geometry.coordinates;
  //     const centroid: LatLngExpression = geometricCentroid(coords[0]);

  //     L.marker(centroid, {
  //       icon: icons.ParkingIcon,
  //     }).addTo(parkingLayer);
  //   }
  // });

  return parkingLayer;
}

function setSportsAreas(sportsAreas: Feature[], callback: Function): L.GeoJSON {
  return L.geoJSON(sportsAreas, {
    style: {
      color: mapTheme.sportsArea,
      weight: 0,
      fillOpacity: 0.5,
    },
    onEachFeature: (feature, layer) => {
      const { name, type }: Properties = feature.properties!;
      const labels = labelBuilder(feature.properties!);
      layer
        .bindTooltip(tooltipTemplate(name, type, labels), {
          className: "polygon-label",
        })
        .on("click", () => {
          callback(feature);
        });
    },
  });
}

function setRestrooms(restrooms: Feature[], callback: Function): L.GeoJSON {
  let restroomsFiltered = restrooms.filter(
    (feature) => feature.properties!.type === "Restroom"
  );
  return L.geoJSON(restroomsFiltered, {
    pointToLayer: (feature, latlng) => {
      const { name, type }: Properties = feature.properties!;
      const labels = labelBuilder(feature.properties!);
      return L.marker(latlng, {
        icon: icons.RestroomIcon,
      })
        .bindTooltip(tooltipTemplate(name, type, labels), {
          className: "polygon-label", // optional CSS class
        })
        .on("click", () => {
          callback(feature);
        });
    },
  });
}

function setPrintingServices(
  printingServices: Feature[],
  callback: Function
): L.GeoJSON {
  let printingServicesFiltered = printingServices.filter(
    (feature) => feature.properties!.type === "Printing Service"
  );
  return L.geoJSON(printingServicesFiltered, {
    pointToLayer: (feature, latlng) => {
      const { description, level }: Properties = feature.properties!;
      const labels = {
        Description: description,
        Level: level,
      };
      return L.marker(latlng, {
        icon: icons.PrintingServiceIcon,
      })
        .bindTooltip(
          tooltipTemplate("Printing Service", "printing-service", labels),
          {
            className: "polygon-label",
          }
        )
        .on("click", () => {
          callback(feature);
        });
    },
  });
}

function setLandmarks(landmarks: Feature[], callback: Function): L.GeoJSON {
  let landmarksFiltered = landmarks.filter(
    (feature) => feature.properties!.type === "Landmark"
  );
  return L.geoJSON(landmarksFiltered, {
    pointToLayer: (feature, latlng) => {
      const { name, type }: Properties = feature.properties;
      const labels = labelBuilder(feature.properties!);
      return L.marker(latlng, {
        icon: icons.LandmarkIcon,
      })
        .bindTooltip(tooltipTemplate(name, type, labels), {
          className: "polygon-label", // optional CSS class
        })
        .on("click", () => {
          callback(feature);
        });
    },
  });
}

function setEventCenters(
  eventCenters: Feature[],
  callback: Function
): L.GeoJSON {
  let eventCentersFiltered = eventCenters.filter(
    (feature) => feature.properties!.type === "Event Center"
  );
  return L.geoJSON(eventCentersFiltered, {
    pointToLayer: (feature, latlng) => {
      const { name, type }: Properties = feature.properties;
      const labels = labelBuilder(feature.properties!);
      return L.marker(latlng, {
        icon: icons.EventCenterIcon,
      })
        .bindTooltip(tooltipTemplate(name, type, labels), {
          className: "polygon-label", // optional CSS class
        })
        .on("click", () => {
          callback(feature);
        });
    },
  });
}

function setEssentials(
  essentials: Feature[],
  callback: (feature: Feature) => void
): L.GeoJSON {
  const essentialsFiltered = essentials.filter(
    (feature) => feature.properties?.type === "Essential"
  );

  return L.geoJSON(essentialsFiltered, {
    pointToLayer: (feature, latlng) => {
      const { name, type, iconParams }: Properties = feature.properties!;
      const labels = labelBuilder(feature.properties);
      let marker;

      if (iconParams) {
        marker = L.marker(latlng, {
          icon: L.icon({ ...iconParams }),
        });
      } else {
        marker = L.marker(latlng, {
          icon: icons.EssentialsIcon,
        });
      }
      marker.bindTooltip(tooltipTemplate(name, type, labels), {
        className: "polygon-label",
      });

      marker.on("click", () => {
        callback(feature);
      });

      return marker;
    },
  });
}

function findCentroid(feature: Feature): LatLngExpression {
  let centroid: LatLngExpression = [0, 0];
  if (feature.geometry.type === "Point") {
    let coords = feature.geometry.coordinates as Array<number>;
    let lat = coords[1];
    let lng = coords[0];
    centroid = [lat, lng];
  } else if (feature.geometry.type === "Polygon") {
    centroid = geometricCentroid(feature.geometry.coordinates[0] as Position[]);
  } else {
    console.warn("Unsupported geometry type:", feature.geometry.type);
  }

  return centroid;
}

function labelBuilder(properties: Properties): Record<string, string> {
  if (!properties) {
    return {
      Name: "Unknown",
      Description: "No description available",
    };
  }

  if (properties.custom_properties) {
    return properties.custom_properties as Record<string, string>;
  }

  const fallback = "N/A or unknown";

  switch (properties.type) {
    case "building":
      return {
        Building: properties["addr:housenumber"] || fallback,
        Levels: properties["building:levels"] || fallback,
      };

    case "bench":
      return {
        "Estimated Capacity": properties["Estimated Capacity"] || fallback,
        "Has lighting": properties.Lit || fallback,
        "Has roofing": properties["Has roofing"] || fallback,
        "Has backrest": properties["Has backrest"] || fallback,
        "Has table": properties["Has table"] || fallback,
      };

    case "parking":
      return {
        Vehicles: properties.vehicles || fallback,
        Surface: properties.Surface || fallback,
        Fee: properties.Fee || fallback,
      };

    case "sports":
      return {
        Level: properties["building:levels"] || fallback,
        "Has roofing": properties["Has roofing"] || fallback,
        Outdoor: properties.Outdoor || fallback,
        "Has lighting": properties.Lit || fallback,
        "Sport(s)": properties.Sport || fallback,
        Surface: properties.Surface || fallback,
      };

    case "Restroom":
    case "Event Center":
    case "Landmark":
    case "Printing Service":
    case "Essential":
      return {
        Level: properties.level || fallback,
        Description: properties.description || "No description available",
      };

    default:
      return {
        Name: properties.name || "Unknown",
        Description: properties.description || "No description available",
      };
  }
}

const controls = {
  getCurrentPosition,
  locateMe,
  geometricCentroid,
  tooltipTemplate,
  setBuildings,
  setBenches,
  setParkingSpaces,
  setRestrooms,
  setPrintingServices,
  setLandmarks,
  setEventCenters,
  findCentroid,
  labelBuilder,
  setSportsAreas,
  setEssentials,
};

export default controls;

export {
  getCurrentPosition,
  locateMe,
  geometricCentroid,
  tooltipTemplate,
  setBuildings,
  setBenches,
  setParkingSpaces,
  setRestrooms,
  setPrintingServices,
  setLandmarks,
  setEventCenters,
  findCentroid,
  labelBuilder,
  setSportsAreas,
  setEssentials,
};
