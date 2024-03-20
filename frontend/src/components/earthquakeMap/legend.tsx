import React from "react";

const POSITION_CLASSES: { [key: string]: string } = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

function Legend({ position }: { position?: string }) {
  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

  return (
    <div className={positionClass}>
      <div className="legend leaflet-control leaflet-bar">
        <h2 className="legend-title">Magnitude</h2>
        <ul className="legend-labels">
          <li style={{ color: "var(--fourth-color)" }}>5.0-5.9</li>
          <li style={{ color: "var(--third-color)" }}>6.0-6.9</li>
          <li style={{ color: "var(--second-color)" }}>7+</li>
        </ul>
      </div>
    </div>
  );
}

export default Legend;
