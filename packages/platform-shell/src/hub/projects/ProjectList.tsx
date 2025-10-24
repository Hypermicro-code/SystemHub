// ==== [BLOCK: ProjectList] BEGIN ====
import React from "react";
import { loadProjects, createProject } from "../data";
import { setQueryParams, getBrowserLocale } from "../nav";
import { NewProjectModal } from "./NewProjectModal";
import { buildProjectsCsv, downloadCsv } from "../export";

export function ProjectList() {
  const [rows, setRows] = React.useState(loadProjects());
  const [showNew, setShowNew] = React.useState(false);

  const refresh = () => setRows(loadProjects());

  const exportCsv = () => {
    const csv = buildProjectsCsv();
    downloadCsv("manage-hub-projects.csv", csv);
  };

  const orgId = "demo-org";
  const locale = getBrowserLocale();

  return (
    <section className="hub-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Prosjekter</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="mcl-btn" onClick={() => setShowNew(true)}>Nytt prosjekt</button>
          <button className="mcl-btn" onClick={refresh} title="Oppdater liste">Oppdater</button>
          <button className="mcl-btn" onClick={exportCsv} title="Eksporter som CSV">Eksporter CSV</button>
        </div>
      </div>

      <div style={{ marginTop: 12, border: "1px solid #2A2E34" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #2A2E34" }}>
              <th style={{ padding: "8px 10px" }}>Prosjekt</th>
              <th style={{ padding: "8px 10px" }}>Status</th>
              <th style={{ padding: "8px 10px" }}>Opprettet</th>
              <th style={{ padding: "8px 10px" }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(p => (
              <tr key={p.id} style={{ borderTop: "1px solid #2A2E34" }}>
                <td style={{ padding: "8px 10px" }}>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div style={{ opacity: 0.8, fontSize: 12 }}>{p.id}</div>
                </td>
                <td style={{ padding: "8px 10px" }}>{p.status === "archived" ? "Arkivert" : "Aktiv"}</td>
                <td style={{ padding: "8px 10px" }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "8px 10px", textAlign: "right" }}>
                  <button
                    className="mcl-btn"
                    onClick={() => setQueryParams({ view: "hub", page: "projects", pid: p.id })}
                    title="Åpne detalj"
                  >
                    Åpne
                  </button>
                  <a
                    className="mcl-btn"
                    style={{ marginLeft: 6, textDecoration: "none" }}
                    href={`./?projectId=${encodeURIComponent(p.id)}&orgId=${encodeURIComponent(orgId)}&locale=${encodeURIComponent(locale)}`}
                    title="Åpne i Progress"
                  >
                    Progress
                  </a>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td style={{ padding: 12, opacity: 0.8 }} colSpan={4}>
                  Ingen prosjekter enda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showNew && (
        <NewProjectModal
          onCancel={() => setShowNew(false)}
          onCreate={(name) => {
            const proj = createProject(name);
            setShowNew(false);
            setRows(loadProjects());
            setQueryParams({ view: "hub", page: "projects", pid: proj.id });
          }}
        />
      )}
    </section>
  );
}
// ==== [BLOCK: ProjectList] END ====
