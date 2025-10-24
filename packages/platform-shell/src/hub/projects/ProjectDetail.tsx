// ==== [BLOCK: ProjectDetail] BEGIN ====
import React from "react";
import { getProject, updateProjectName, archiveProject } from "../data";
import { setQueryParams } from "../nav";

export function ProjectDetail({ projectId }: { projectId: string }) {
  const [name, setName] = React.useState<string>("");
  const [status, setStatus] = React.useState<"active" | "archived">("active");

  React.useEffect(() => {
    const p = getProject(projectId);
    if (p) {
      setName(p.name);
      setStatus(p.status ?? "active");
    }
  }, [projectId]);

  const backToList = () => setQueryParams({ view: "hub", page: "projects", pid: null });

  const saveName = () => {
    if (name.trim()) updateProjectName(projectId, name.trim());
  };

  const doArchive = () => {
    archiveProject(projectId);
    setStatus("archived");
  };

  return (
    <section className="hub-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Prosjekt: {projectId}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="mcl-btn" onClick={backToList}>Til liste</button>
          <a className="mcl-btn" href={`./?projectId=${encodeURIComponent(projectId)}`}>Åpne i Progress</a>
        </div>
      </div>

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>Navn</label>
          <input
            style={{
              width: "100%",
              height: 32,
              background: "#1D2024",
              color: "#EAECEF",
              border: "1px solid #3A4047",
              padding: "0 8px",
              borderRadius: 0
            }}
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={saveName}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>Status</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span>{status === "archived" ? "Arkivert" : "Aktiv"}</span>
            {status !== "archived" && (
              <button className="mcl-btn" onClick={doArchive} title="Arkiver prosjekt">Arkiver</button>
            )}
          </div>
        </div>

        <div style={{ opacity: 0.8, fontSize: 12 }}>
          (Plassholdere her: prosjektbeskrivelse, medlemmer/roller, tags, preferanser)
        </div>
      </div>
    </section>
  );
}
// ==== [BLOCK: ProjectDetail] END ====
