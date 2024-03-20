import React, { useEffect, useState } from "react";
import EarthquakeMap from "./components/earthquakeMap";
import { Earthquake } from "./interfaces";
import {
  fetchAllEarthquakes,
  fetchLatestEarthquake,
  fetchStrongestEarthquake,
} from "./services/earthquakeService";
import EarthquakeListItem from "./components/earthquakeListItem";
import EarthquakeForm from "./components/earthquakeForm";

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
        <p>Track the latest earthquakes around the world!</p>
      </header>
      <div className="earthquake-list">
        <EarthquakeForm />
        <hr />
        <h2>Latest Earthquake</h2>
        {latestEarthquake && (
          <div>
            <p>
              <strong>Magnitude:</strong> {latestEarthquake.magnitude}
              <br />
              <strong>Location:</strong> {latestEarthquake.lat},{" "}
              {latestEarthquake.lon}
              <br />
              <strong>Date:</strong>{" "}
              {latestEarthquake.created_at?.toLocaleString()}
              <br />
            </p>
          </div>
        )}
        <div className="alert-box-third">
          <h3>Note!</h3>
          <p>
            Pins are displayed on the map for 15 minutes for earthquakes with a
            magnitude of 5.0 or higher.
          </p>
        </div>
        <hr />
        <h2>Strongest Earthquake</h2>
        {strongestEarthquake && (
          <div>
            <p>
              <strong>Magnitude:</strong> {strongestEarthquake.magnitude}
              <br />
              <strong>Location:</strong> {strongestEarthquake.lat},{" "}
              {strongestEarthquake.lon}
              <br />
              <strong>Date:</strong>{" "}
              {strongestEarthquake.created_at?.toLocaleString()}
              <br />
            </p>
          </div>
        )}
        <hr />
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
