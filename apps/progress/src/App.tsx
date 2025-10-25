// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
import { useProgressCtx } from "./context/ProgressContext";

/** Ekte TableCore fra pakken din */
import TableCore from "../../../packages/table-core/src/TableCore";

/** Ekte ToolbarCore fra pakken din */
import ToolbarCore from "../../../packages/toolbar-core/src/ToolbarCore";

/** Banneren vi lagde for Full-modus */
import { ProjectInfoBanner } from "./ux/ProjectInfoBanner";
// ==== [BLOCK: Imports] END ====


// ==== [BLOCK: Demo Data] BEGIN ====
// Felles kolonnedefinisjoner for Lite + Full (in-memory demo)
const DEMO_COLUMNS = [
  { id: "name",      header: "Aktivitet",  type: "text",   width: 220 },
  { id: "start",     header: "Start",      type: "date",   width: 140 },
  { id: "end",       header: "Slutt",      type: "date",   width: 140 },
  { id: "duration",  header: "Varighet",   type: "number", width: 110, validate: (v: any)=> (v>=0 ? null : "≥ 0") },
  { id: "owner",     header: "Ansvarlig",  type: "select", width: 160, options: [
      { value: "team-a", label: "Team A" },
      { value: "team-b", label: "Team B" },
      { value: "ext",    label: "Ekstern" },
    ] },
  { id: "status",    header: "Status %",   type: "number", width: 120, validate: (v: any)=> (v>=0 && v<=100 ? null : "0–100") },
  { id: "color",     header: "Farge",      type: "color",  width: 90 },
] as const;

function mkRow(id: string, name: string, start: string, end: string, duration: number, owner: string, status: number, color: string) {
  return { id, name, start, end, duration, owner, status, color };
}
const DEMO_ROWS_INITIAL = [
  mkRow("r1", "Oppstart / plan", "2025-01-06", "2025-01-10", 5,  "team-a", 100, "#66ccff"),
  mkRow("r2", "Prosjektering",   "2025-01-13", "2025-02-21", 30, "team-b",  45, "#ffaa66"),
  mkRow("r3", "Innkjøp",         "2025-02-03", "2025-02-14", 10, "ext",     15, "#cc99ff"),
  mkRow("r4", "Montasje",        "2025-03-03", "2025-03-28", 20, "team-a",   0, "#aaff99"),
];
// ==== [BLOCK: Demo Data] END ====


// ==== [BLOCK: Component] BEGIN ====
export default function App() {
  const { mode } = useProgressCtx();
  const [rows, setRows] = React.useState(DEMO_ROWS_INITIAL);

  const onPatch = (patch: { rowId: string; colId: string; oldValue: any; nextValue: any }) => {
    setRows(prev => prev.map(r => (r.id === patch.rowId ? { ...r, [patch.colId]: patch.nextValue } : r)));
  };

  // ---- LITE-MODUS: presentasjon + utskrift (ingen lagring, men full tabell)
  if (mode === "lite") {
    return (
      <div className="progress-print-root" style={{ display: "grid", gridTemplateRows: "auto 1fr auto", height: "100%" }}>
        <div style={{ padding: 16 }}>
          <h1 style={{ margin: 0 }}>📋 Progress Lite</h1>
          <div style={{ fontSize: 14, opacity: 0.9 }}>
            <p><b>Merk:</b> Data lagres ikke i Lite – skriv ut/eksporter til PDF.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href={(() => { const u = new URL(window.location.href); u.searchParams.set("mode","full"); return u.pathname + "?" + u.searchParams.toString(); })()}
              className="mcl-btn no-print"
              style={{ textDecoration: "none" }}
            >
              Gå til full modus
            </a>
            <button className="mcl-btn no-print" onClick={() => window.print()}>Eksporter til PDF</button>
          </div>
        </div>

        {/* Tabell – ekte TableCore */}
        <div style={{ borderTop: "1px solid #2A2E34" }}>
          <TableCore columns={DEMO_COLUMNS as any} rows={rows} onPatch={onPatch} />
        </div>

        {/* (Plass for statisk Gantt i Lite – kommer) */}
        <div style={{ borderTop: "1px solid #2A2E34", display: "grid", placeItems: "center", color: "#888", height: 240 }}>
          (Statisk Gantt for utskrift – kommer)
        </div>
      </div>
    );
  }

  // ---- FULL-MODUS: banner + toolbar + tabell + (senere) gantt
  return (
    <div className="progress-full-mode" style={{ display: "grid", gridTemplateRows: "auto auto 1fr auto", height: "100%" }}>
      <ProjectInfoBanner />

      {/* Ekte ToolbarCore – krever deps, se steg 3 */}
      <ToolbarCore />

      <div style={{ borderTop: "1px solid #2A2E34" }}>
        <TableCore columns={DEMO_COLUMNS as any} rows={rows} onPatch={onPatch} />
      </div>

      <div style={{ borderTop: "1px solid #2A2E34", background: "#101214", display: "grid", placeItems: "center", color: "#888", height: 280 }}>
        (Gantt-visning – dynamisk, kommer)
      </div>
    </div>
  );
}
// ==== [BLOCK: Component] END ====
