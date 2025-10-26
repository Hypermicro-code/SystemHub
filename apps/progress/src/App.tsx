import React from "react";
import { useProgressCtx } from "./context/ProgressContext";
import {
  ToolbarCore,
  registerCommands,
  unregisterCommand,
  type SlotInjection,
  type ToolbarContext,
} from "@hypermicro-code/toolbar-core";
import { TableCore, type ColumnDef, type RowLike } from "@hypermicro-code/table-core";
import { useShell } from "@hypermicro-code/platform-shell";
import { ProjectInfoBanner } from "./ux/ProjectInfoBanner";
const ICONS = {
  add: "➕",
  clear: "🧹",
  log: "🗒️",
  gantt: "📈",
  timescale: "🕒",
  vat: "💸",
};

const DEMO_COLUMNS: ColumnDef<RowLike>[] = [
  { id: "name", header: "Aktivitet", type: "text", width: 220 },
  { id: "start", header: "Start", type: "date", width: 140 },
  { id: "end", header: "Slutt", type: "date", width: 140 },
  { id: "duration", header: "Varighet", type: "number", width: 110, validate: (v: any) => (v >= 0 ? undefined : new Error("≥ 0")) },
  {
    id: "owner",
    header: "Ansvarlig",
    type: "select",
    width: 160,
    options: [
      { value: "team-a", label: "Team A" },
      { value: "team-b", label: "Team B" },
      { value: "ext", label: "Ekstern" },
    ],
  },
  {
    id: "status",
    header: "Status %",
    type: "number",
    width: 120,
    validate: (v: any) => (v >= 0 && v <= 100 ? undefined : new Error("0–100")),
  },
  { id: "color", header: "Farge", type: "color", width: 90 },
];

function mkRow(
  id: string,
  name: string,
  start: string,
  end: string,
  duration: number,
  owner: string,
  status: number,
  color: string,
): RowLike {
  return { id, name, start, end, duration, owner, status, color };
}

const DEMO_ROWS_INITIAL: RowLike[] = [
  mkRow("r1", "Oppstart / plan", "2025-01-06", "2025-01-10", 5, "team-a", 100, "#66ccff"),
  mkRow("r2", "Prosjektering", "2025-01-13", "2025-02-21", 30, "team-b", 45, "#ffaa66"),
  mkRow("r3", "Innkjøp", "2025-02-03", "2025-02-14", 10, "ext", 15, "#cc99ff"),
  mkRow("r4", "Montasje", "2025-03-03", "2025-03-28", 20, "team-a", 0, "#aaff99"),
];

export default function App() {
  const { mode } = useProgressCtx();
  const { pushToast } = useShell();

    const [rows, setRows] = React.useState<RowLike[]>(DEMO_ROWS_INITIAL);
  const [online, setOnline] = React.useState(true);
  const [dirty, setDirty] = React.useState(false);
  const [showGantt, setShowGantt] = React.useState(true);

  const rowsRef = React.useRef(rows);
  React.useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  const showGanttRef = React.useRef(showGantt);
  React.useEffect(() => {
    showGanttRef.current = showGantt;
  }, [showGantt]);

  const pushToastRef = React.useRef(pushToast);
  React.useEffect(() => {
    pushToastRef.current = pushToast;
  }, [pushToast]);

  const toolbarCtx = React.useMemo<ToolbarContext>(() => ({
    role: "admin",
    online,
    dirty,
    zoom: 1,
    density: "comfortable",
    app: "progress",
  }), [online, dirty]);

  const addRowRef = React.useRef<() => void>(() => {});
  const clearRowsRef = React.useRef<() => void>(() => {});
  const logRowsRef = React.useRef<() => void>(() => {});
  const toggleGanttRef = React.useRef<() => void>(() => {});

  addRowRef.current = () => {
    const next: RowLike[] = [
      ...rowsRef.current,
      { id: `r${String(rowsRef.current.length + 1).padStart(2, "0")}`, name: "Ny aktivitet", start: "", end: "", duration: 0, owner: "team-a", status: 0, color: "#4b9cff" },
    ];
    setRows(next);
    setDirty(true);
    pushToastRef.current?.("La til ny aktivitet");
  };

    clearRowsRef.current = () => {
    setRows([]);
    setDirty(true);
    pushToastRef.current?.("Tabell tømt");
  };

  logRowsRef.current = () => {
    console.log("[Progress/Table] columns:", DEMO_COLUMNS, "rows:", rowsRef.current);
    pushToastRef.current?.("Data logget i Console");
  };

  toggleGanttRef.current = () => {
    setShowGantt((v) => !v);
  };

  React.useEffect(() => {
    const commands = [
      {
        id: "progress.addRow",
        label: "Ny aktivitet",
        icon: ICONS.add,
        group: "progress",
        run: () => addRowRef.current(),
      },
      {
        id: "progress.clearRows",
        label: "Tøm tabell",
        icon: ICONS.clear,
        group: "progress",
        run: () => clearRowsRef.current(),
        isEnabled: () => rowsRef.current.length > 0,
      },
      {
        id: "progress.logData",
        label: "Logg data",
        icon: ICONS.log,
        group: "progress",
        run: () => logRowsRef.current(),
      },
      {
        id: "progress.toggleGantt",
        label: "Gantt",
        icon: ICONS.gantt,
        group: "progress",
        run: () => toggleGanttRef.current(),
        pressed: () => showGanttRef.current,
      },
      {
        id: "planning.timescale",
        label: "Timeskala",
        icon: ICONS.timescale,
        group: "planning",
        run: () => pushToastRef.current?.("Timeskala (demo)") ?? void 0,
      },
      {
        id: "estimates.vat",
        label: "MVA-profil",
        icon: ICONS.vat,
        group: "estimates",
        run: () => pushToastRef.current?.("MVA-profil (demo)") ?? void 0,
      },
    ];

    registerCommands(commands);
    return () => {
      commands.forEach((cmd) => unregisterCommand(cmd.id));
    };
  }, []);

  const slots = React.useMemo<SlotInjection[]>(() => [
    {
      tab: "Project",
      area: "center",
      order: 10,
      groups: [
        { id: "progress-core", commandIds: ["progress.addRow", "progress.clearRows", "progress.logData"] },
        { id: "progress-view", commandIds: ["progress.toggleGantt"] },
      ],
    },
    {
      tab: "App",
      area: "center",
      order: 20,
      groups: [
        { id: "progress-app", commandIds: ["planning.timescale", "estimates.vat"] },
      ],
    },
  ], []);

  const onPatch = React.useCallback((patch: { rowId: string; colId: string; oldValue: any; nextValue: any }) => {
    setRows((prev) => prev.map((r) => (r.id === patch.rowId ? { ...r, [patch.colId]: patch.nextValue } : r)));
    setDirty(true);
    pushToastRef.current?.("Endring lagret");
  }, []);
  
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
              href={(() => {
                const u = new URL(window.location.href);
                u.searchParams.set("mode", "full");
                return u.pathname + "?" + u.searchParams.toString();
              })()}
              className="mcl-btn no-print"
              style={{ textDecoration: "none" }}
            >
              Gå til full modus
            </a>
            <button className="mcl-btn no-print" onClick={() => window.print()}>Eksporter til PDF</button>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #2A2E34" }}>
          <TableCore columns={DEMO_COLUMNS} rows={rows} onPatch={onPatch} />
        </div>

        <div style={{ borderTop: "1px solid #2A2E34", display: "grid", placeItems: "center", color: "#888", height: 240 }}>
          (Statisk Gantt for utskrift – kommer)
        </div>
      </div>
    );
  }

  return (
    <div className="progress-full-mode" style={{ display: "grid", gridTemplateRows: "auto auto 1fr auto", height: "100%" }}>
      <ProjectInfoBanner />

       <ToolbarCore
        ctx={toolbarCtx}
        slots={slots}
        projectName="DemoProsjekt"
        status={toolbarCtx.online ? (toolbarCtx.dirty ? "autosave" : "saved") : "offline"}
        maxWidth="1280px"
      />

      <div style={{ borderTop: "1px solid #2A2E34", padding: "12px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button className="mcl-btn" onClick={() => setOnline((v) => !v)}>
            Toggle Online ({String(online)})
          </button>
          <button className="mcl-btn" onClick={() => setDirty((v) => !v)}>
            Toggle Dirty ({String(dirty)})
          </button>
        </div>
        <TableCore columns={DEMO_COLUMNS} rows={rows} onPatch={onPatch} />
      </div>

      {showGantt ? (
        <div style={{ borderTop: "1px solid #2A2E34", background: "#101214", display: "grid", placeItems: "center", color: "#888", height: 280 }}>
          (Gantt-visning – dynamisk, kommer)
        </div>
      ) : (
        <div style={{ borderTop: "1px solid #2A2E34", background: "#101214", display: "grid", placeItems: "center", color: "#555", height: 120 }}>
          Gantt er skjult
        </div>
      )}
    </div>
  );
}
