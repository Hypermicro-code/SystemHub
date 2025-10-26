/* ============================================
   GanttPlaceholder – stabil boks uten layout-hopp
   ============================================ */
import React from "react"

export default function GanttPlaceholder(
  { variant, note }: { variant: "static" | "coming-soon"; note?: string }
) {
  return (
    <div className="gantt-ph" aria-label="Gantt placeholder">
      <div className="gantt-ph-title">
        {variant === "static" ? "Gantt (statisk)" : "Gantt (kommer)"}
      </div>
      {note && <div className="gantt-ph-note">{note}</div>}
      <div className="gantt-ph-body">
        {/* Behold høyde for å unngå hopp ved print/visning */}
      </div>
      <style>{`
        .gantt-ph { height: 280px; border: 1px dashed #444; border-radius: 12px; padding: 12px; color: #ddd; }
        .gantt-ph-title { font-weight: 600; margin-bottom: 4px; }
        .gantt-ph-note { opacity: .8; margin-bottom: 8px; }
        .gantt-ph-body { height: calc(100% - 40px); background: repeating-linear-gradient(
          90deg, #1b1b1b, #1b1b1b 8px, #1c1c1c 8px, #1c1c1c 16px
        ); border-radius: 8px; }
      `}</style>
    </div>
  )
}
