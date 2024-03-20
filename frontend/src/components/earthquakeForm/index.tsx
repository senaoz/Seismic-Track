import React, { useState } from "react";
import { addEarthquake } from "../../services/earthquakeService";
import "./style.css";

const EarthquakeForm: React.FC = () => {
  const [magnitude, setMagnitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addEarthquake({
      magnitude,
      lat: latitude,
      lon: longitude,
    });
  };

  return (
    <div>
      <h2>Report New Earthquake</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="row">
          <label>Magnitude</label>
          <input
            type="number"
            step="0.01"
            value={magnitude}
            onChange={(e) => setMagnitude(parseFloat(e.target.value))}
          />
        </div>
        <div className="row">
          <label>Latitude</label>
          <input
            type="number"
            step="0.000001"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
          />
        </div>
        <div className="row">
          <label>Longitude</label>
          <input
            type="number"
            step="0.000001"
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
          />
        </div>
        <button type="submit">Add Earthquake</button>
      </form>
    </div>
  );
};

export default EarthquakeForm;
