import React from "react";
import { useShell, ProjectList } from "@hypermicro-code/platform-shell";

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

  return (
    <div>
      <p>Progress er montert.</p>
      <ul>
        <li><strong>orgId:</strong> {String(orgId)}</li>
        <li><strong>projectId:</strong> {String(projectId)}</li>
        <li><strong>locale:</strong> {String(locale)}</li>
      </ul>

      <h3 style={{ marginTop: 24 }}>Dine prosjekter (dummy)</h3>
      <ProjectList
        items={items}
        onSelect={(it) => {
          console.log("[Progress] valgt prosjekt:", it);
          pushToast(`Valgt prosjekt: ${it.code || it.id}`);
        }}
      />

      <p style={{ opacity: 0.8, marginTop: 16 }}>
        Test “Ping Progress” i header for å se kommando-bussen (toast + Console).
      </p>
    </div>
  );
}
