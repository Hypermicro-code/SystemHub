// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Component] BEGIN ====
export function Sidebar() {
  const base = "./?view=hub";

  return (
    <aside className="mcl-sidebar">
      <nav className="mcl-nav">
        <div className="mcl-nav-section">Hub</div>
        <a className="mcl-nav-link" href={`${base}&page=dashboard`}>Oversikt</a>
        <a className="mcl-nav-link" href={`${base}&page=projects`}>Prosjekter</a>
        <a className="mcl-nav-link" href={`${base}&page=reports`}>Rapporter</a>
        <a className="mcl-nav-link" href={`${base}&page=org`}>Organisasjon</a>

        <div className="mcl-nav-section">Moduler</div>
        <a className="mcl-nav-link" href="./">Manage Progress</a>
        <a className="mcl-nav-link" href="#">Manage Estimates</a>
        <a className="mcl-nav-link" href="#">Manage Workflow</a>
        <a className="mcl-nav-link" href="#">Manage Registry</a>
      </nav>
    </aside>
  );
}
// ==== [BLOCK: Component] END ====
