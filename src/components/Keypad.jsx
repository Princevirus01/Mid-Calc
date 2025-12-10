
import React from "react";
import Button from "./Button";

export default function Keypad({ append, clearAll, backspace, evaluateExpression }) {
  const keys = [
    ["C", clearAll],
    ["⌫", backspace],
    ["(", () => append("(")],
    [")", () => append(")")],
    ["sin", () => append("sin(")],
    ["cos", () => append("cos(")],
    ["tan", () => append("tan(")],
    ["^", () => append("^")],
    ["asin", () => append("asin(")],
    ["acos", () => append("acos(")],
    ["atan", () => append("atan(")],
    ["√", () => append("sqrt(")],
    ["ln", () => append("ln(")],
    ["log", () => append("log(")],
    ["10ˣ", () => append("invlog(")],
    ["eˣ", () => append("exp(")],
    ["7", () => append("7")],
    ["8", () => append("8")],
    ["9", () => append("9")],
    ["÷", () => append("÷")],
    ["4", () => append("4")],
    ["5", () => append("5")],
    ["6", () => append("6")],
    ["×", () => append("×")],
    ["1", () => append("1")],
    ["2", () => append("2")],
    ["3", () => append("3")],
    ["−", () => append("-")],
    ["0", () => append("0")],
    [".", () => append(".")],
    ["+", () => append("+")],
    ["=", evaluateExpression, "primary"],
  ];

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {keys.map(([label, fn, type], i) => (
        <Button key={i} label={label} onClick={fn} type={type || "secondary"} />
      ))}
    </div>
  );
}
