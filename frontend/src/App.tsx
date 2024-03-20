import React, { useEffect, useState } from "react";
import EarthquakeMap from "./components/earthquakeMap";
import { Earthquake } from "./interfaces";
import {
  fetchAllEarthquakes,
  fetchLatestEarthquake,
  fetchStrongestEarthquake,
} from "./services/earthquakeService";
import EarthquakeListItem from "./components/earthquakeListItem";

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
    <div className="grid-container">
      <header className="header">
        <h1>Seismic Tracker</h1>
      </header>
      <div className="earthquake-list">
        <h2>Latest Earthquake</h2>
        {latestEarthquake && (
          <div>
            <p>
              <strong>Magnitude:</strong> {latestEarthquake.magnitude}
            </p>
            <p>
              <strong>Location:</strong> {latestEarthquake.lat},{" "}
              {latestEarthquake.lon}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {latestEarthquake.created_at.toLocaleString()}
            </p>
          </div>
        )}
        <h2>Strongest Earthquake</h2>
        {strongestEarthquake && (
          <div>
            <p>
              <strong>Magnitude:</strong> {strongestEarthquake.magnitude}
            </p>
            <p>
              <strong>Location:</strong> {strongestEarthquake.lat},{" "}
              {strongestEarthquake.lon}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {strongestEarthquake.created_at.toLocaleString()}
            </p>
          </div>
        )}
        <h2>All Earthquakes</h2>
        <ul>
          {earthquakes &&
            earthquakes.map((earthquake) => (
              <EarthquakeListItem earthquake={earthquake} />
            ))}
        </ul>
      </div>
      <EarthquakeMap earthquakes={earthquakes || []} />
    </div>
  );
};

export default App;
