
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Display from "./Display";
import Keypad from "./Keypad";
import ModeSwitch from "./ModeSwitch";

export default function Calculator() {
  const [expr, setExpr] = useState("");
  const [angleMode, setAngleMode] = useState("DEG");

  const degToRad = (deg) => (deg * Math.PI) / 180;
  const radToDeg = (rad) => (rad * 180) / Math.PI;

  const API = {
    sin: (x) => Math.sin(angleMode === "RAD" ? x : degToRad(x)),
    cos: (x) => Math.cos(angleMode === "RAD" ? x : degToRad(x)),
    tan: (x) => Math.tan(angleMode === "RAD" ? x : degToRad(x)),
    asin: (x) => (angleMode === "RAD" ? Math.asin(x) : radToDeg(Math.asin(x))),
    acos: (x) => (angleMode === "RAD" ? Math.acos(x) : radToDeg(Math.acos(x))),
    atan: (x) => (angleMode === "RAD" ? Math.atan(x) : radToDeg(Math.atan(x))),
    ln: (x) => Math.log(x),
    log: (x) => Math.log10(x),
    invlog: (x) => Math.pow(10, x),
    exp: (x) => Math.exp(x),
    sqrt: (x) => Math.sqrt(x),
    root: (n, x) => Math.pow(x, 1 / n),
    pow: (a, b) => Math.pow(a, b),
    abs: (x) => Math.abs(x),
    PI: Math.PI,
    E: Math.E,
  };

  const evaluateExpression = () => {
    if (!expr) return;
    try {
      let e = expr
        .replace(/÷/g, "/")
        .replace(/×/g, "*")
        .replace(/([0-9.]+)%/g, "($1/100)")
        .replace(/(\d)\(/g, "$1*(")
        .replace(/\)(\d)/g, ")*$1")
        .replace(/(\d)(PI|E)/gi, "$1*$2")
        .replace(/(PI|E)(\d)/gi, "$1*$2")
        .replace(/([A-Za-z0-9.)]+)\^([A-Za-z0-9.(]+)/g, "Math.pow($1,$2)");

      const allowed = Object.keys(API);
      const argNames = [...allowed, "Math"];
      const argValues = [...allowed.map((k) => API[k]), Math];
      const fn = new Function(...argNames, `return (${e});`);
      const result = fn(...argValues);
      setExpr(String(result));
    } catch {
      setExpr("Error");
    }
  };

  const append = (val) => setExpr(expr + val);
  const clearAll = () => setExpr("");
  const backspace = () => setExpr(expr.slice(0, -1));

  useEffect(() => {
    const handleKey = (e) => {
      const k = e.key;
      if ((k >= "0" && k <= "9") || k === ".") append(k);
      else if (k === "Enter" || k === "=") {
        e.preventDefault();
        evaluateExpression();
      } else if (k === "Backspace") backspace();
      else if (k === "Escape") clearAll();
      else if ("+-*/()^".includes(k)) append(k);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="container py-4 d-flex justify-content-center">
      <div className="card shadow-lg p-3" style={{ maxWidth: 400, background: "#0b1220", color: "#fff" }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Advanced Calculator</h5>
          <ModeSwitch angleMode={angleMode} setAngleMode={setAngleMode} />
        </div>

        <Display expr={expr} />
        <Keypad
          append={append}
          clearAll={clearAll}
          backspace={backspace}
          evaluateExpression={evaluateExpression}
        />
      </div>
    </div>
  );
}
