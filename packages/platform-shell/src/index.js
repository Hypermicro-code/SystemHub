// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Constants] BEGIN ====
export const SHELL_NAME = "PlatformShell";
export const SHELL_VERSION = "0.0.1";
// ==== [BLOCK: Constants] END ====

// ==== [BLOCK: Component] BEGIN ====
// Enkel, stabil stub-komponent. Kan byttes ut senere uten å endre API.
export function PlatformShell(props) {
  const {
    title = "MorningCoffee Labs – Platform Shell",
    subtitle = "Stub-komponent (Steg 2)",
    style = {}
  } = props || {};

  const base = {
    fontFamily: "system-ui, Segoe UI, Roboto, Arial, sans-serif",
    border: "1px solid #333",
    padding: "16px",
    borderRadius: "8px",
    background: "linear-gradient(180deg, #1f1f1f, #111)",
    color: "#f5f5f5"
  };

  const merged = { ...base, ...style };

  // JSX er byttet ut med React.createElement for å unngå transpile i node_modules
  return React.createElement(
    "div",
    { style: merged, "data-shell": SHELL_NAME, "data-version": SHELL_VERSION },
    React.createElement(
      "div",
      { style: { fontSize: 18, fontWeight: 700, marginBottom: 6 } },
      title
    ),
    React.createElement(
      "div",
      { style: { opacity: 0.8 } },
      subtitle
    )
  );
}
// ==== [BLOCK: Component] END ====

// ==== [BLOCK: Helpers] BEGIN ====
export function getShellInfo() {
  return { name: SHELL_NAME, version: SHELL_VERSION };
}
// ==== [BLOCK: Helpers] END ====

// Standard default export (kan være praktisk i noen imports)
export default PlatformShell;
