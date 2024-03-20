import React from "react";
import { Earthquake } from "../../interfaces";

const EarthquakeListItem = ({ earthquake }: { earthquake: Earthquake }) => {
  let color = "";
  if (earthquake.magnitude >= 7) {
    color = "darkred";
  } else if (earthquake.magnitude >= 6) {
    color = "red";
  } else {
    color = "orange";
  }

  return (
    <li key={earthquake.id}>
      <div className="magnitude" style={{ color: color }}>
        {earthquake.magnitude.toFixed(1)}
      </div>
      <div>
        <strong>
          {earthquake.lat}, {earthquake.lon}
        </strong>
        <br />
        {earthquake.created_at.toLocaleString()}
      </div>
    </li>
  );
};

export default EarthquakeListItem;
