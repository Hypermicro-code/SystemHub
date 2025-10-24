import React from "react";

export default function ProgressGridView() {
  const boxStyle: React.CSSProperties = {
    background: "#001b33",
    border: "1px solid #004080",
    borderRadius: 8,
    padding: 12,
    color: "#cce0ff",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    gap: 12
  };

  const toolbarStyle: React.CSSProperties = {
    background: "#00264d",
    border: "1px solid #004080",
    borderRadius: 6,
    padding: "8px 12px",
    fontWeight: 600
  };

  const tableStyle: React.CSSProperties = {
    background: "#001326",
    border: "1px solid #004080",
    borderRadius: 6,
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontStyle: "italic",
    opacity: 0.8
  };

  return (
    <div style={boxStyle}>
      <div style={toolbarStyle}>[ToolbarCore mount placeholder]</div>
      <div style={tableStyle}>[TableCore mount placeholder]</div>
    </div>
  );
}
