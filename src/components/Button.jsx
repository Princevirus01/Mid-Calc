
import React from "react";

export default function Button({ label, onClick, type = "secondary" }) {
  return (
    <button
      className={`btn btn-sm m-1 btn-${type}`}
      style={{ minWidth: 70, minHeight: 45 }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
