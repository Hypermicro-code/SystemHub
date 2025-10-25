// ==== [BLOCK: LiteBadge] BEGIN ====
import React from "react";
import { useProgressCtx } from "../context/ProgressContext";

export function LiteBadge() {
  const { mode } = useProgressCtx();
  if (mode !== "lite") return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 6,
        right: 6,
        zIndex: 9999,
        padding: "4px 8px",
        fontSize: 12,
        background: "#17181B",
        color: "#EAECEF",
        border: "1px solid #3A4047",
      }}
      aria-label="Lite-modus aktiv"
    >
      LITE modus aktiv
    </div>
  );
}
// ==== [BLOCK: LiteBadge] END ====
