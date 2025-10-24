import React from "react";

export function TableCore(props) {
  const style = {
    width: "100%",
    height: "100%",
    minHeight: 220,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0b1120",          // mørk blågrå
    border: "1px dashed #3b82f6",   // synlig markering (ikke Progress-blå)
    color: "#e5e7eb",
    fontFamily: "system-ui, sans-serif",
    borderRadius: 6
  };
  return React.createElement(
    "div",
    { style, "data-core": "TableCore" },
    "[TableCore mounted]"
  );
}

export default TableCore;
