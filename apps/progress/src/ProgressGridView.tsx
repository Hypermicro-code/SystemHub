import React from "react";
import { TableCore, TableRow, TableColumn } from "@hypermicro-code/table-core";
import { ToolbarCore } from "@hypermicro-code/toolbar-core";
import { useShell } from "@hypermicro-code/platform-shell";
import GanttPreview from "./GanttPreview";

export default function ProgressGridView() {
  const { pushToast } = useShell();

  // --- Columns & Rows (eies av Progress) ---
  const [columns] = React.useState<TableColumn[]>([
    { key: "id", title: "ID", width: 100 },
    { key: "name", title: "Aktivitet", width: 260 },
    { key: "start", title: "Start", width: 140 },
    { key: "end", title: "Slutt", width: 140 }
  ]);

  const [rows, setRows] = React.useState<TableRow[]>([
    { id: "A-01", name: "Oppstart prosjekt", start: "2025-11-01", end: "2025-11-02" },
    { id: "A-02", name: "Planlegging",       start: "2025-11-03", end: "2025-11-10" }
  ]);

  // --- UI state ---
  const [showGantt, setShowGantt] = React.useState(true);

  // --- Toolbar-kommandoliste ---
  const commands = React.useMemo(
    () => [
      { id: "add-row",     label: "Legg til rad", hint: "Append nederst" },
      { id: "clear",       label: "Tøm tabell",   hint: "Fjern alle rader" },
      { id: "log",         label: "Logg data",    hint: "Console.log" },
      { id: "toggleGantt", label: showGantt ? "Skjul Gantt" : "Vis Gantt", hint: "Veksle Gantt" }
    ],
    [showGantt]
  );

  function handleCommand(id: string) {
    if (id === "add-row") {
      const next: TableRow[] = [
        ...rows,
        { id: `A-${String(rows.length + 1).padStart(2, "0")}`, name: "Ny aktivitet", start: "", end: "" }
      ];
      setRows(next);
      pushToast("La til ny rad");
    } else if (id === "clear") {
      setRows([]);
      pushToast("Tabell tømt");
    } else if (id === "log") {
      // @ts-ignore
      console.log("[Progress/Table] columns:", columns, "rows:", rows);
      pushToast("Data logget i Console");
    } else if (id === "toggleGantt") {
      setShowGantt((v) => !v);
    }
  }

  function handleRowsChange(next: TableRow[]) {
    setRows(next);
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
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minHeight: 260,
    padding: 6
  };

  return (
    <div style={boxStyle}>
      <div style={toolbarWrap}>
        <ToolbarCore commands={commands} onCommand={handleCommand} />
      </div>
      <div style={tableWrap}>
        <div style={{ flex: 1, display: "flex" }}>
          <div style={{ flex: 1 }}>
            <TableCore columns={columns} rows={rows} onRowsChange={handleRowsChange} />
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
