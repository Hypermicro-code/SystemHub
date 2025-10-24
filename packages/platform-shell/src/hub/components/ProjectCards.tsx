// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
// ==== [BLOCK: Imports] END ====

export type ProjectInfo = { id: string; name: string };

export function ProjectCards({ items }: { items: ProjectInfo[] }) {
  return (
    <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
      {items.map(p => (
        <a
          key={p.id}
          className="mcl-nav-link"
          href={`./?projectId=${encodeURIComponent(p.id)}`}
          title={`Åpne ${p.name}`}
          style={{
            border: "1px solid var(--mcl-border, #2A2E34)",
            padding: 12,
            textDecoration: "none",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
          <div style={{ opacity: 0.8, fontSize: 12 }}>{p.id}</div>
        </a>
      ))}
    </div>
  );
}
