// ==== [BLOCK: ProjectInfoBanner] BEGIN ====
import React from "react";
import { useProgressCtx } from "../context/ProgressContext";

export function ProjectInfoBanner() {
  const { projectId, orgId, locale, mode } = useProgressCtx();

  // Vis kun i full-modus
  if (mode === "lite") return null;

  return (
    <div
      style={{
        padding: "10px 12px",
        borderBottom: "1px solid #2A2E34",
        background: "#141518",
        display: "flex",
        gap: 16,
        alignItems: "center",
        fontSize: 13,
      }}
    >
      <div><b>Prosjekt:</b> {projectId ?? "—"}</div>
      <div><b>Org:</b> {orgId ?? "—"}</div>
      <div><b>Språk:</b> {locale ?? "—"}</div>
    </div>
  );
}
// ==== [BLOCK: ProjectInfoBanner] END ====
