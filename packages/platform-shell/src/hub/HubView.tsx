// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
import { ProjectCards } from "./components/ProjectCards";
import { ModuleLinks } from "./components/ModuleLinks";
import { HubProjects, HubReports, HubOrg } from "./pages";

// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Helpers] BEGIN ====
function getHubPage(): string {
  const qp = new URLSearchParams(window.location.search);
  return qp.get("page") || "dashboard";
}
// ==== [BLOCK: Helpers] END ====

// ==== [BLOCK: Component] BEGIN ====
export function HubView() {
  const page = getHubPage();

  // Dummy org + prosjektliste
  const org = { id: "demo-org", name: "Morning Coffee Labs (demo)" };
  const projects = [
    { id: "P-1001", name: "Kjøsnesfjorden – Kontrollsystem" },
    { id: "P-1002", name: "Lang-Sima – Turbinrunnere" },
    { id: "P-1003", name: "Hodnaberg – Fordelinger" },
  ];

  return (
    <div className="hub-root" style={{ display: "grid", gap: 12 }}>
      {page === "dashboard" && (
        <>
          <section className="hub-section">
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

          <section className="hub-section">
            <h2 style={{ fontSize: 16, margin: "0 0 6px 0" }}>Dine prosjekter</h2>
            <ProjectCards items={projects} />
          </section>

          <section className="hub-section">
            <h2 style={{ fontSize: 16, margin: "0 0 6px 0" }}>Moduler</h2>
            <ModuleLinks />
          </section>

          <section className="hub-section">
            <div style={{ opacity: 0.8, fontSize: 12 }}>
              (Plassholder: brukerroller, nylig aktivitet, oppgaver, varsler, integrasjoner)
            </div>
          </section>
        </>
      )}

      {page === "projects" && <HubProjects />}
      {page === "reports" && <HubReports />}
      {page === "org" && <HubOrg />}
    </div>
  );
}
// ==== [BLOCK: Component] END ====
