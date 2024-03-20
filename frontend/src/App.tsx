import React, { useEffect, useState } from "react";
import "./App.css";
import EarthquakeMap from "./components/earthquakeMap";
import { Earthquake } from "./interfaces";
import {
  fetchAllEarthquakes,
  fetchLatestEarthquake,
  fetchStrongestEarthquake,
} from "./services/earthquakeService";

const App: React.FC = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[] | null>(null);
  const [latestEarthquake, setLatestEarthquake] = useState<Earthquake | null>(
    null,
  );
  const [strongestEarthquake, setStrongestEarthquake] =
    useState<Earthquake | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [allQuakes, latestQuake, strongestQuake] = await Promise.all([
        fetchAllEarthquakes(),
        fetchLatestEarthquake(),
        fetchStrongestEarthquake(),
      ]);
      setEarthquakes(allQuakes);
      setLatestEarthquake(latestQuake);
      setStrongestEarthquake(strongestQuake);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Earthquake Data</h1>
      <h2>All Earthquakes</h2>
      <ul>
        {earthquakes &&
          earthquakes.map((earthquake) => (
            <li key={earthquake.id}>
              Magnitude: {earthquake.magnitude}, Latitude: {earthquake.lat},
              Longitude: {earthquake.lon}
            </li>
          ))}
      </ul>
      {earthquakes && <EarthquakeMap earthquakes={earthquakes} />}

      <h2>
        📌 Latest Earthquake:{" "}
        {latestEarthquake?.created_at &&
          new Date(latestEarthquake.created_at).toLocaleString()}
      </h2>
      {latestEarthquake && (
        <p>
          Magnitude: {latestEarthquake.magnitude}, Latitude:{" "}
          {latestEarthquake.lat}, Longitude: {latestEarthquake.lon}
        </p>
      )}

      <h2>📌 Strongest Earthquake: {strongestEarthquake?.magnitude}</h2>
      {strongestEarthquake && (
        <p>
          Magnitude: {strongestEarthquake.magnitude}, Latitude:{" "}
          {strongestEarthquake.lat}, Longitude: {strongestEarthquake.lon}
        </p>
      )}
    </div>
  );
};

export default App;
