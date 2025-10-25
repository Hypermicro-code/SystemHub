// ==== [BLOCK: TopbarIndicator] BEGIN ====
import React from "react";
import { useProgressCtx } from "../../../../apps/progress/src/context/ProgressContext";

export function TopbarIndicator() {
  const { projectId, mode } = useProgressCtx();

  if (!projectId) return null;

  const bg = mode === "lite" ? "#2D2F33" : "#1E2125";
  const txt = mode === "lite" ? "#FFD76D" : "#A6E1FA";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: bg,
        color: txt,
        fontSize: 13,
        padding: "4px 10px",
        borderRadius: 4,
        marginRight: 12,
      }}
      title={`Prosjekt ${projectId} – ${mode === "lite" ? "Lite-modus" : "Full-modus"}`}
    >
      <span style={{ fontWeight: 600 }}>{projectId}</span>
      <span style={{ opacity: 0.8 }}>({mode})</span>
    </div>
  );
}
// ==== [BLOCK: TopbarIndicator] END ====
