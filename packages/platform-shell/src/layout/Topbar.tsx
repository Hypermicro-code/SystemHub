// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Component] BEGIN ====
export function Topbar() {
  return (
    <header className="mcl-topbar">
      <div className="mcl-topbar-left">
        <div className="mcl-brand">
          <span className="mcl-brand-title">Manage Plattformen</span>
          <span className="mcl-brand-sub">— levert av Morning Coffee Labs</span>
        </div>
      </div>

      <div className="mcl-topbar-right">
        {/* Plassholdere for språk/tema/profil */}
        <button className="mcl-btn ghost" title="Språk">NO/EN</button>
        <button className="mcl-btn ghost" title="Tema">🌓</button>
        <button className="mcl-btn ghost" title="Hjelp">?</button>
      </div>
    </header>
  );
}
// ==== [BLOCK: Component] END ====
