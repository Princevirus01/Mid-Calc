
import React from "react";

export default function ModeSwitch({ angleMode, setAngleMode }) {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="angleMode"
        checked={angleMode === "RAD"}
        onChange={() => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")}
      />
      <label className="form-check-label" htmlFor="angleMode">
        {angleMode}
      </label>
    </div>
  );
}
