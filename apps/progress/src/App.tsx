// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
import { useProgressCtx } from "./context/ProgressContext";
// Vi antar at du allerede har TableCore og Gantt mountet i App.
// Hvis ikke, fungerer dette fortsatt — du får bare presentasjonsdelen synlig.
import { TableCore } from "../../../packages/table-core/src/TableCore";
import { ToolbarCore } from "../../../packages/toolbar-core/src/ToolbarCore";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Component] BEGIN ====
export default function App() {
  const { mode, projectId, orgId, locale } = useProgressCtx();

  // Lite-modus → presentasjonsvisning
  if (mode === "lite") {
    return (
      <div
        style={{
          padding: 24,
          color: "#EAECEF",
          fontFamily: "Inter, sans-serif",
          display: "grid",
          gap: 16,
        }}
      >
        <h1 style={{ margin: 0 }}>📋 Progress Lite</h1>
        <div style={{ fontSize: 14, opacity: 0.9 }}>
          <p><b>Prosjekt ID:</b> {projectId ?? "(ukjent)"}</p>
          <p><b>Organisasjon:</b> {orgId ?? "(demo-org)"}</p>
          <p><b>Språk:</b> {locale ?? "nb-NO"}</p>
          <p><b>Modus:</b> Lite-visning (redigering deaktivert)</p>
        </div>
        <div
          style={{
            border: "1px dashed #3A4047",
            padding: 20,
            background: "#1D2024",
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          Gantt / tabell / redigering er slått av i Lite-modus.
        </div>
        <div>
          <a
            href="./"
            className="mcl-btn"
            style={{ textDecoration: "none" }}
          >
            Gå til full modus
          </a>
        </div>
      </div>
    );
  }

  // Full-modus → normal app (tabell + toolbar + gantt)
  return (
    <div className="progress-full-mode" style={{ display: "grid", height: "100%" }}>
      <ToolbarCore />
      <div style={{ display: "grid", gridTemplateRows: "1fr 300px", height: "100%" }}>
        <TableCore />
        <div
          style={{
            borderTop: "1px solid #2A2E34",
            background: "#101214",
            display: "grid",
            placeItems: "center",
            color: "#888",
          }}
        >
          (Gantt-visning eller tidslinje kommer her)
        </div>
      </div>
    </div>
  );
}
// ==== [BLOCK: Component] END ====
