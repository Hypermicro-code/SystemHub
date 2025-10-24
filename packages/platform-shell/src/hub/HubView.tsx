// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
import { ModuleLinks } from "./components/ModuleLinks";
import { ProjectCards } from "./components/ProjectCards";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Component] BEGIN ====
export function HubView() {
  // Dummy/org-props – senere kobles dette mot PlatformData
  const org = { id: "demo-org", name: "Morning Coffee Labs (demo)" };
  const projects = [
    { id: "P-1001", name: "Kjøsnesfjorden – Kontrollsystem" },
    { id: "P-1002", name: "Lang-Sima – Turbinrunnere" },
    { id: "P-1003", name: "Hodnaberg – Fordelinger" },
  ];

  return (
    <div className="hub-root" style={{ display: "grid", gap: 12 }}>
      {/* Org + hurtigvalg */}
      <section className="hub-section" aria-label="Organisasjon">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 600 }}>{org.name}</div>
            <div style={{ opacity: 0.8, fontSize: 12 }}>orgId: {org.id}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="mcl-btn">Nytt prosjekt</button>
            <button className="mcl-btn">Importer</button>
            <button className="mcl-btn">Rapporter</button>
          </div>
        </div>
      </section>

      {/* Prosjektkort */}
      <section className="hub-section" aria-label="Dine prosjekter">
        <h2 style={{ fontSize: 16, margin: "0 0 6px 0" }}>Dine prosjekter</h2>
        <ProjectCards items={projects} />
      </section>

      {/* Modullinker */}
      <section className="hub-section" aria-label="Moduler">
        <h2 style={{ fontSize: 16, margin: "0 0 6px 0" }}>Moduler</h2>
        <ModuleLinks />
      </section>

      {/* Plass for kommende paneler: brukere/roller, nylige aktiviteter, notiser, etc. */}
      <section className="hub-section" aria-label="Kommende paneler">
        <div style={{ opacity: 0.8, fontSize: 12 }}>
          (Plassholdere: brukerroller, nylig aktivitet, oppgaver, varsler, integrasjoner)
        </div>
      </section>
    </div>
  );
}
// ==== [BLOCK: Component] END ====
