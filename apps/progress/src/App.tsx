/* ============================================
   Manage Progress / SystemHub
   App.tsx – Lite & Full moduser uten i18n
   - Viser ToolbarCore + TableCore i begge moduser
   - GanttPlaceholder (statisk)
   - Print-støtte i Lite
   - Null lagring i denne fasen (Lite skjuler/nekter)
   ============================================ */

import React, { useMemo } from "react"

/* ==== [BLOCK: Robust imports] BEGIN ==== */
/** TableCore: relativ sti fra /apps/progress/src → /packages/table-core */
import * as TableCoreMod from "../../../packages/table-core/src/core/TableCore"

/** ToolbarCore: alias @ peker til /packages/toolbar-core/src (se vite.config.ts) */
import * as ToolbarCoreMod from "@/core/ToolbarCore"

/** Lokale komponenter */
import ProjectInfoBanner from "./components/ProjectInfoBanner"
import GanttPlaceholder from "./components/GanttPlaceholder"
import "./print.css"

/** Tolerant fabrikk for default/navngitt eksport */
const pickExport = (m: any, key?: string) =>
  (m && (m.default ?? (key ? m[key] : undefined) ?? m)) || null

const TableCore = pickExport(TableCoreMod, "TableCore") as any
const ToolbarCore = pickExport(ToolbarCoreMod, "ToolbarCore") as any
/* ==== [BLOCK: Robust imports] END ==== */

/* ==== [BLOCK: Mode detection] BEGIN ==== */
type Mode = "lite" | "full"
const getMode = (): Mode => {
  const sp = new URLSearchParams(window.location.search)
  const m = (sp.get("mode") || "").toLowerCase()
  return m === "lite" ? "lite" : "full"
}
/* ==== [BLOCK: Mode detection] END ==== */

/* ==== [BLOCK: Demo data (midlertidig)] BEGIN ==== */
type Row = { id: string; aktivitet: string; start: string; slutt: string; farge?: string }

const INITIAL_ROWS: Row[] = [
  { id: "1", aktivitet: "Kickoff",          start: "2025-11-03", slutt: "2025-11-03", farge: "#7ea1" },
  { id: "2", aktivitet: "Designfase",       start: "2025-11-04", slutt: "2025-11-14", farge: "#6ab3" },
  { id: "3", aktivitet: "Bygg & test",      start: "2025-11-17", slutt: "2025-12-05", farge: "#49c8" },
  { id: "4", aktivitet: "Overlevering",     start: "2025-12-08", slutt: "2025-12-10", farge: "#f9a3" },
]
/* ==== [BLOCK: Demo data (midlertidig)] END ==== */

/* ==== [BLOCK: Fallback UI] BEGIN ==== */
/** Om TableCore/ToolbarCore ikke kan lastes, vis enkel fallback */
const Missing = ({ what }: { what: string }) => (
  <div style={{ padding: 12, border: "1px dashed #999", borderRadius: 8, margin: "8px 0" }}>
    <strong>{what}</strong> ikke tilgjengelig (sjekk import/sti).
  </div>
)
/* ==== [BLOCK: Fallback UI] END ==== */

/* ==== [BLOCK: App] BEGIN ==== */
export default function App() {
  const mode = useMemo(getMode, [])
  const isLite = mode === "lite"

  /** Lite: skjul/nekter lagring. Full: klargjort for senere wiring. */
  const toolbarProps = useMemo(() => {
    if (!ToolbarCore) return {}
    return (isLite
      ? { mode: "lite", allowSave: false, onSave: undefined }
      : { mode: "full", allowSave: true, onSave: () => {/* wiring i neste etappe */} }
    )
  }, [isLite])

  /** TableCore props – redigerbar i begge (ingen lagring ennå) */
  const tableProps = useMemo(() => {
    if (!TableCore) return {}
    return {
      rows: INITIAL_ROWS,
      editable: true,
      onRowsChange: (_next: Row[]) => {
        // Bevisst tom i denne fasen (ingen lagring).
        // Wiring til persistering kommer i neste etappe.
      },
    }
  }, [])

  /** Print i Lite: skjuler krom via print.css */
  const handlePrint = () => window.print()

  return (
    <div className={`app-shell ${isLite ? "mode-lite" : "mode-full"}`}>
      {/* === [BLOCK: Header/Banner] === */}
      {!isLite && <ProjectInfoBanner title="Prosjekt X" subtitle="Uten lagring (klar for wiring)" />}

      {/* === [BLOCK: Toolbar] === */}
      <div className="app-toolbar app-chrome">
        {ToolbarCore
          ? <ToolbarCore {...toolbarProps} />
          : <Missing what="ToolbarCore" />}
        {isLite && (
          <button className="print-btn" onClick={handlePrint} aria-label="Skriv ut">
            Skriv ut
          </button>
        )}
      </div>

      {/* === [BLOCK: Main] === */}
      <div className="app-main">
        <div className="table-wrap">
          {TableCore
            ? <TableCore {...tableProps} />
            : <Missing what="TableCore" />}
        </div>

        <div className="gantt-wrap">
          <GanttPlaceholder
            variant={isLite ? "static" : "coming-soon"}
            note={isLite ? "Statisk placeholder (Lite)" : "Dynamisk Gantt kommer i Full"}
          />
        </div>
      </div>

      {/* === [BLOCK: Styles – enkle base-stiler her for tydelighet] === */}
      <style>{`
        .app-shell { display: flex; flex-direction: column; min-height: 100vh; }
        .app-toolbar { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-bottom: 1px solid #2223; }
        .print-btn { margin-left: auto; padding: 8px 12px; border-radius: 8px; border: 1px solid #444; background: #222; color: #fff; cursor: pointer; }
        .print-btn:hover { opacity: .9; }
        .app-main { display: grid; grid-template-columns: 1fr 360px; gap: 12px; padding: 12px; }
        .table-wrap, .gantt-wrap { background: #111; border: 1px solid #222; border-radius: 12px; padding: 12px; }
        .mode-lite .app-toolbar, .mode-lite .print-btn { background: #1f1a16; } /* "kaffetone" */
        .mode-full .app-toolbar { background: #1f1a16; }
      `}</style>
    </div>
  )
}
/* ==== [BLOCK: App] END ==== */
