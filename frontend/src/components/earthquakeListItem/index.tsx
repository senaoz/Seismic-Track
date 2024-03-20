import React from "react";
import { Earthquake } from "../../interfaces";

const EarthquakeListItem = ({
  earthquake,
  popup,
}: {
  earthquake: Earthquake;
  popup?: boolean;
}) => {
  let color = "";
  if (earthquake.magnitude >= 7) {
    color = "var(--second-color)";
  } else if (earthquake.magnitude >= 6) {
    color = "var(--third-color)";
  } else if (earthquake.magnitude >= 5) {
    color = "var(--fourth-color)";
  } else {
    color = "#29344194";
  }

  return (
    <li
      className={popup ? "earthquake-popup-item" : "earthquake-list-item"}
      key={earthquake.id}
    >
      <div className="magnitude" style={{ color: color }}>
        {earthquake.magnitude.toFixed(1)}
      </div>
      <div>
        <strong>
          {earthquake.lat}, {earthquake.lon}
        </strong>
        <br />
        {earthquake.created_at?.toLocaleString()}
      </div>
    </li>
  );
};

export default EarthquakeListItem;
