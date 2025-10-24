import React from "react";
import { useShell } from "@hypermicro-code/platform-shell";

export default function ProgressHome() {
  const { orgId, projectId, locale, setAppCommandHandler, pushToast } = useShell();

  React.useEffect(() => {
    // Registrer handler for kommandoer fra Shell (toolbar)
    setAppCommandHandler((cmd) => {
      console.log("[Progress] mottatt kommando:", cmd);
      if (cmd?.name === "progress:ping") {
        pushToast("Progress mottok ping ✅");
      }
    });
  }, [setAppCommandHandler, pushToast]);

  return (
    <div>
      <p>Progress er montert.</p>
      <ul>
        <li><strong>orgId:</strong> {String(orgId)}</li>
        <li><strong>projectId:</strong> {String(projectId)}</li>
        <li><strong>locale:</strong> {String(locale)}</li>
      </ul>
      <p>Trykk “Ping Progress” i header for å teste kommando-bussen (se Console + toast).</p>
    </div>
  );
}
