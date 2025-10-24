import React from "react";

export function ToolbarCore(props) {
  const style = {
    width: "100%",
    minHeight: 44,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    background: "#111827",          // mørk
    border: "1px dashed #f59e0b",   // ravgul markering
    color: "#f3f4f6",
    fontFamily: "system-ui, sans-serif",
    borderRadius: 6
  };
  return React.createElement(
    "div",
    { style, "data-core": "ToolbarCore" },
    "[ToolbarCore mounted]"
  );
}

export default ToolbarCore;
