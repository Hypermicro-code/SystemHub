// ==== [BLOCK: HubBridgeOverlay] BEGIN ====
import React from "react";

function readParam(k: string): string | null {
  return new URLSearchParams(window.location.search).get(k);
}

type Ctx = {
  projectId?: string;
  orgId?: string;
};

export function HubBridgeOverlay() {
  const [visible, setVisible] = React.useState(true);

  const ctx: Ctx = {
    projectId: readParam("projectId") ?? undefined,
    orgId: readParam("orgId") ?? undefined,
  };

  const hasCtx = !!(ctx.projectId || ctx.orgId);
  React.useEffect(() => {
    if (!hasCtx) return;

    // 1) Lagre til localStorage for senere bruk i Progress
    try {
      localStorage.setItem("mcl.progress.ctx", JSON.stringify(ctx));
    } catch {}

    // 2) Post et vindu-signal (kan kobles i Progress senere)
    try {
      window.postMessage({ type: "mcl:progress:setContext", payload: ctx }, "*");
    } catch {}
  }, [hasCtx, ctx.projectId, ctx.orgId]);

  if (!hasCtx || !visible) return null;

  // Diskret overlay – påvirker ikke din eksisterende layout (kan lukkes)
  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        right: 8,
        zIndex: 9999,
        background: "#17181B",
        color: "#EAECEF",
        border: "1px solid #3A4047",
        padding: "8px 10px",
        fontSize: 12,
        maxWidth: 320,
      }}
      role="status"
      aria-live="polite"
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <strong>Hub-kontekst</strong>
        <button
          className="mcl-btn"
          onClick={() => setVisible(false)}
          title="Skjul"
          style={{ height: 22, padding: "0 6px" }}
        >
          ×
        </button>
      </div>
      <div style={{ marginTop: 6, display: "grid", gap: 2 }}>
        {ctx.projectId && <div><span style={{ opacity: 0.75 }}>projectId:</span> {ctx.projectId}</div>}
        {ctx.orgId && <div><span style={{ opacity: 0.75 }}>orgId:</span> {ctx.orgId}</div>}
      </div>
    </div>
  );
}
// ==== [BLOCK: HubBridgeOverlay] END ====
