// ==== [BLOCK: NewProjectModal] BEGIN ====
import React from "react";

export function NewProjectModal({
  onCancel,
  onCreate,
}: {
  onCancel: () => void;
  onCreate: (name: string) => void;
}) {
  const [name, setName] = React.useState("");

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
      }}
      onClick={onCancel}
    >
      <div
        style={{
          width: 420,
          background: "#17181B",
          border: "1px solid #3A4047",
          padding: 16,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>Nytt prosjekt</h3>
        <label style={{ display: "block", fontSize: 12, opacity: 0.85, marginBottom: 4 }}>
          Prosjektnavn
        </label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            height: 32,
            background: "#1D2024",
            color: "#EAECEF",
            border: "1px solid #3A4047",
            padding: "0 8px",
            borderRadius: 0,
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          <button className="mcl-btn" onClick={onCancel}>Avbryt</button>
          <button
            className="mcl-btn"
            onClick={() => name.trim() && onCreate(name.trim())}
            title="Opprett"
          >
            Opprett
          </button>
        </div>
      </div>
    </div>
  );
}
// ==== [BLOCK: NewProjectModal] END ====
