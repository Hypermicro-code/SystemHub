// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
// ==== [BLOCK: Imports] END ====

export function ModuleLinks() {
  const mods = [
    { key: "progress", name: "Manage Progress", href: "./" },
    { key: "estimates", name: "Manage Estimates", href: "#" },
    { key: "workflow", name: "Manage Workflow", href: "#" },
    { key: "registry", name: "Manage Registry", href: "#" },
    { key: "hub", name: "Manage Hub (denne)", href: "./?view=hub" },
  ];

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {mods.map(m => (
        <a key={m.key} className="mcl-btn" href={m.href} title={m.name} style={{ textDecoration: "none" }}>
          {m.name}
        </a>
      ))}
    </div>
  );
}
