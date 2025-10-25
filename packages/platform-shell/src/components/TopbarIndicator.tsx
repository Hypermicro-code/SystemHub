// ==== [BLOCK: TopbarIndicator] BEGIN ====
import React from "react";

function useOptionalProgressCtx(): { projectId?: string; mode?: string } {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require("../../../../apps/progress/src/context/ProgressContext");
    if (mod && typeof mod.useProgressCtx === "function") {
      return mod.useProgressCtx();
    }
  } catch {
    /* tom */
  }
  return {};
}

export function TopbarIndicator() {
  const { projectId, mode } = useOptionalProgressCtx();

  const label =
    projectId || mode
      ? `${projectId ?? "Ukjent prosjekt"}  |  ${mode === "lite" ? "Lite-modus" : "Full-modus"}`
      : "Ingen aktivt prosjekt";

  return (
    <div
      style={{
        marginLeft: "auto",
        padding: "4px 12px",
        fontSize: 13,
        color: "#EAECEF",
        opacity: 0.9,
      }}
      title="Aktivt prosjekt / modus"
    >
      {label}
    </div>
  );
}
// ==== [BLOCK: TopbarIndicator] END ====
