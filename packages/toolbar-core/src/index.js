import React from "react";

/**
 * Minimal “core” toolbar:
 * - Viser en rad knapper
 * - onCommand(id) fires ved klikk
 */
export function ToolbarCore(props) {
  const { commands = [], onCommand } = props || {};

  const root = {
    width: "100%",
    minHeight: 44,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    background: "#111827",
    border: "1px dashed #f59e0b",
    color: "#f3f4f6",
    fontFamily: "system-ui, sans-serif",
    borderRadius: 6
  };

  const btn = {
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "6px 10px",
    borderRadius: 6,
    background: "#1f2937",
    color: "#f3f4f6",
    cursor: "pointer",
    fontWeight: 600
  };

  const children = (commands || []).map((c) =>
    React.createElement(
      "button",
      {
        key: c.id,
        style: btn,
        title: c.hint || "",
        onClick: () => typeof onCommand === "function" && onCommand(c.id)
      },
      String(c.label)
    )
  );

  return React.createElement("div", { style: root, "data-core": "ToolbarCore" }, children);
}

export default ToolbarCore;
