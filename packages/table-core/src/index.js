import React from "react";

/**
 * Minimal “core” tabell:
 * - Viser columns/rows
 * - Enkel redigering via <input> (ingen JSX)
 * - Kaller onRowsChange(next) ved endring
 */
export function TableCore(props) {
  const { columns = [], rows = [], onRowsChange } = props || {};

  const rootStyle = {
    width: "100%",
    height: "100%",
    minHeight: 220,
    overflow: "auto",
    background: "#0b1120",
    border: "1px dashed #3b82f6",
    color: "#e5e7eb",
    fontFamily: "system-ui, sans-serif",
    borderRadius: 6,
    padding: 8
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed"
  };

  const thStyle = {
    textAlign: "left",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    padding: "6px 8px",
    fontWeight: 700,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  const tdStyle = {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "4px 8px",
    verticalAlign: "middle"
  };

  function handleInputChange(rowIndex, key, value) {
    if (typeof onRowsChange !== "function") return;
    const next = rows.slice();
    next[rowIndex] = { ...next[rowIndex], [key]: value };
    onRowsChange(next);
  }

  // Header
  const headerCells = (columns || []).map((col) =>
    React.createElement(
      "th",
      {
        key: col.key,
        style: { ...thStyle, width: col.width ? col.width + "px" : undefined }
      },
      String(col.title || col.key)
    )
  );

  // Body
  const bodyRows = (rows || []).map((row, r) => {
    const cells = (columns || []).map((col) => {
      const val = row[col.key] ?? "";
      // input for enkel redigering
      return React.createElement(
        "td",
        { key: col.key, style: tdStyle },
        React.createElement("input", {
          defaultValue: String(val),
          onBlur: (e) => handleInputChange(r, col.key, e.target.value),
          style: {
            width: "100%",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "inherit",
            padding: "4px 6px",
            borderRadius: 4
          }
        })
      );
    });

    return React.createElement("tr", { key: r }, cells);
  });

  return React.createElement(
    "div",
    { style: rootStyle, "data-core": "TableCore" },
    React.createElement(
      "table",
      { style: tableStyle },
      React.createElement("thead", null, React.createElement("tr", null, headerCells)),
      React.createElement("tbody", null, bodyRows)
    )
  );
}

export default TableCore;
