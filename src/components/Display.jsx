
import React from "react";

export default function Display({ expr }) {
  return (
    <div
      className="bg-dark text-end rounded p-3 mb-3"
      style={{ minHeight: 60, fontSize: "1.4rem", overflowX: "auto" }}
    >
      {expr || "0"}
    </div>
  );
}
