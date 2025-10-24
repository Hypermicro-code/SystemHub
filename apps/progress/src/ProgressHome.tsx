import React from "react";
import { useShell, ProjectList } from "@hypermicro-code/platform-shell";
import ProgressGridView from "./ProgressGridView";

export default function ProgressHome() {
  const { orgId, projectId, locale, setAppCommandHandler, pushToast } = useShell();

  React.useEffect(() => {
    setAppCommandHandler((cmd) => {
      console.log("[Progress] mottatt kommando:", cmd);
      if (cmd?.name === "progress:ping") {
        pushToast("Progress mottok ping ✅");
      }
    });
  }, [setAppCommandHandler, pushToast]);

  const items = React.useMemo(
    () => [
      { id: "P-1001", name: "Kjøsnesfjorden – Kontrollsystem", code: "P-1001" },
      { id: "P-1002", name: "Lang-Sima – Turbinrunnere", code: "P-1002" },
      { id: "P-1003", name: "Hodnaberg – Fordelinger", code: "P-1003" }
    ],
    []
  );

  const boxStyle: React.CSSProperties = {
    background: "#001b33",
    border: "1px solid #004080",
    borderRadius: 8,
    padding: 16,
    color: "#cce0ff"
  };

  return (
    <div style={boxStyle}>
      <p style={{ marginTop: 0 }}>Progress er montert.</p>
      <ul style={{ marginBottom: 16 }}>
        <li><strong>orgId:</strong> {String(orgId)}</li>
        <li><strong>projectId:</strong> {String(projectId)}</li>
        <li><strong>locale:</strong> {String(locale)}</li>
      </ul>

      <h3 style={{ marginTop: 0 }}>Dine prosjekter (dummy)</h3>
      <div style={{ background: "#001326", border: "1px solid #004080", borderRadius: 6, padding: 12 }}>
        <ProjectList
          items={items}
          onSelect={(it) => {
            console.log("[Progress] valgt prosjekt:", it);
            pushToast(`Valgt prosjekt: ${it.code || it.id}`);
          }}
        />
      </div>

      <h3 style={{ marginTop: 24 }}>Fremdriftsplan (Grid placeholder)</h3>
      <ProgressGridView />

      <p style={{ opacity: 0.8, marginTop: 16 }}>
        Test “Ping Progress” i header for å se kommando-bussen (toast + Console).
      </p>
    </div>
  );
}
