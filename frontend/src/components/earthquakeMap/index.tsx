import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Legend from "./legend";
import "./style.css";
import { Earthquake } from "../../interfaces";

interface Props {
  earthquakes: Earthquake[];
}

const customIcon = (magnitude: number): L.DivIcon => {
  return new L.DivIcon({
    className: "custom-icon",
    html: `<div style="color: ${magnitude >= 7 ? "darkred" : magnitude >= 6 ? "red" : "orange"}">${magnitude}</div>`,
  });
};

const EarthquakeMap: React.FC<Props> = ({ earthquakes }) => {
  const [pinnedEarthquakes, setPinnedEarthquakes] = useState<
    Earthquake[] | null
  >(null);

  useEffect(() => {
    // "50km çevresi içerisinde olan değerler aynı bölge sayılmali" kuralı gereği
    const groupedEarthquakes: { [key: string]: Earthquake[] } = {};
    earthquakes.forEach((earthquake) => {
      const key = `${Math.floor(earthquake.lat / 0.5)}-${Math.floor(earthquake.lon / 0.5)}`;
      if (!groupedEarthquakes[key]) {
        groupedEarthquakes[key] = [];
      }
      groupedEarthquakes[key].push(earthquake);
    });

    // "Anormal olan depremler harita üzerinde bir süre kalacak şekilde pinlenmelidir" kuralı gereği
    const abnormalEarthquakes: Earthquake[] = [];
    Object.values(groupedEarthquakes).forEach((group) => {
      if (group.length > 0) {
        const maxMagnitude = Math.max(
          ...group.map((earthquake) => earthquake.magnitude),
        );

        // Burada 5.0 ve üzeri depremleri anormal kabul ettim
        if (maxMagnitude > 5) {
          abnormalEarthquakes.push(
            group.find((earthquake) => earthquake.magnitude === maxMagnitude)!,
          );
        }
      }
    });
    setPinnedEarthquakes(abnormalEarthquakes);

    const timeout = setTimeout(
      () => {
        setPinnedEarthquakes([]);
      },
      1000 * 60 * 15, // Pinlerin haritada kalacağı süreyi 15 dakika olarak belirledim
    );

    return () => clearTimeout(timeout);
  }, [earthquakes]);

  return (
    <MapContainer center={[0, 0]} zoom={2} className={"map-container"}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Sena Oz"
      />

      {pinnedEarthquakes &&
        pinnedEarthquakes.map((earthquake) => (
          <Marker
            key={earthquake.id}
            position={[earthquake.lat, earthquake.lon]}
            icon={customIcon(earthquake.magnitude)}
          >
            <Popup>
              <strong>Magnitude:</strong> {earthquake.magnitude}
            </Popup>
          </Marker>
        ))}
      <Legend position="topright" />
    </MapContainer>
  );
};

export default EarthquakeMap;
