import React from "react";
import { TableCore } from "@hypermicro-code/table-core";
import { ToolbarCore } from "@hypermicro-code/toolbar-core";

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

  const toolbarWrap: React.CSSProperties = {
    background: "#00264d",
    border: "1px solid #004080",
    borderRadius: 6,
    padding: 6
  };

  const tableWrap: React.CSSProperties = {
    background: "#001326",
    border: "1px solid #004080",
    borderRadius: 6,
    flexGrow: 1,
    display: "flex",
    minHeight: 260,
    padding: 6
  };

  return (
    <div style={boxStyle}>
      <div style={toolbarWrap}>
        {/* Live mount av ToolbarCore */}
        <ToolbarCore />
      </div>
      <div style={tableWrap}>
        {/* Live mount av TableCore */}
        <div style={{ flex: 1 }}>
          <TableCore />
        </div>
      </div>
    </div>
  );
}
