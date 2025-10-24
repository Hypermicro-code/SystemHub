// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Component] BEGIN ====
export function Sidebar() {
  return (
    <aside className="mcl-sidebar">
      {/* Navigasjon for Hub – plasseres senere mot ekte ruter */}
      <nav className="mcl-nav">
        <div className="mcl-nav-section">Hub</div>
        <a className="mcl-nav-link" href="?mode=system">Prosjekter</a>
        <a className="mcl-nav-link" href="#">Rapporter</a>
        <a className="mcl-nav-link" href="#">Organisasjon</a>

        <div className="mcl-nav-section">Moduler</div>
        <a className="mcl-nav-link" href="#">Manage Progress</a>
        <a className="mcl-nav-link" href="#">Manage Estimates</a>
        <a className="mcl-nav-link" href="#">Manage Workflow</a>
        <a className="mcl-nav-link" href="#">Manage Registry</a>
      </nav>
    </aside>
  );
}
// ==== [BLOCK: Component] END ====
