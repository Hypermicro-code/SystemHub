import React from "react";
import { TableCore, type RowLike, type ColumnDef } from "@hypermicro-code/table-core";
import { useShell } from "@hypermicro-code/platform-shell";
import GanttPreview from "./GanttPreview";

export default function ProgressGridView() {
  const { pushToast } = useShell();

  // --- Columns & Rows (eies av Progress) ---
  const [columns] = React.useState<ColumnDef<RowLike>[]>([
    { id: "id", header: "ID", type: "text", width: 100 },
    { id: "name", header: "Aktivitet", type: "text", width: 260 },
    { id: "start", header: "Start", type: "date", width: 140 },
    { id: "end", header: "Slutt", type: "date", width: 140 }
  ]);

  const [rows, setRows] = React.useState<RowLike[]>([
    { id: "A-01", name: "Oppstart prosjekt", start: "2025-11-01", end: "2025-11-02" },
    { id: "A-02", name: "Planlegging",       start: "2025-11-03", end: "2025-11-10" }
  ]);

  // --- UI state ---
  const [showGantt, setShowGantt] = React.useState(true);

  // --- Toolbar-kommandoliste ---
  function handleAddRow() {
    const next: RowLike[] = [
      ...rows,
      { id: `A-${String(rows.length + 1).padStart(2, "0")}`, name: "Ny aktivitet", start: "", end: "" }
    ];
    setRows(next);
    pushToast("La til ny rad");
  }

  function handleClear() {
    setRows([]);
    pushToast("Tabell tømt");
  }

  function handleLog() {
    console.log("[Progress/Table] columns:", columns, "rows:", rows);
    pushToast("Data logget i Console");
  }

  function handlePatch(patch: { rowId: string; colId: string; nextValue: any }) {
    setRows((prev) => prev.map((row) => (row.id === patch.rowId ? { ...row, [patch.colId]: patch.nextValue } : row)));
    pushToast("Endring lagret");
  }

  // --- Progress-blå rammer ---
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

  const tableWrap: React.CSSProperties = {
    background: "#001326",
    border: "1px solid #004080",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minHeight: 260,
    padding: 6
  };

  return (
    <div style={boxStyle}>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="mcl-btn" onClick={handleAddRow}>Legg til rad</button>
        <button className="mcl-btn" onClick={handleClear}>Tøm tabell</button>
        <button className="mcl-btn" onClick={handleLog}>Logg data</button>
        <button className="mcl-btn" onClick={() => setShowGantt(v => !v)}>
          {showGantt ? "Skjul Gantt" : "Vis Gantt"}
        </button>
      </div>
      <div style={tableWrap}>
        <div style={{ flex: 1, display: "flex" }}>
          <div style={{ flex: 1 }}>
            <TableCore columns={columns} rows={rows} onPatch={handlePatch} />
          </div>
        </div>
        {showGantt && (
          <div style={{ background: "#001b33", border: "1px solid #004080", borderRadius: 6, padding: 8 }}>
            <GanttPreview rows={rows} />
          </div>
        )}
      </div>
    </div>
  );
}
