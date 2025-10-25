// ==== [BLOCK: TopbarIndicator] BEGIN ====
import React from "react";

type Ctx = { projectId?: string; mode?: "lite" | "full" };

function readCtx(): Ctx {
  try {
    const api = (window as any).mclProgress;
    if (api?.getContext) {
      const c = api.getContext();
      return { projectId: c.projectId, mode: c.mode };
    }
  } catch {}
  // Fallback til URL (fungerer i Progress uten provider)
  const qs = new URLSearchParams(window.location.search);
  const projectId = qs.get("projectId") ?? undefined;
  const mode = (qs.get("mode") as "lite" | "full" | null) ?? undefined;
  return { projectId, mode };
}

export function TopbarIndicator() {
  const [ctx, setCtx] = React.useState<Ctx>(() => readCtx());

  React.useEffect(() => {
    const onCtx = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      setCtx({ projectId: detail.projectId, mode: detail.mode });
    };
    window.addEventListener("mcl:progress:ctx", onCtx);
    // liten init i tilfelle provider kom senere
    const t = setTimeout(() => setCtx(readCtx()), 0);
    return () => {
      window.removeEventListener("mcl:progress:ctx", onCtx);
      clearTimeout(t);
    };
  }, []);

  const label =
    ctx.projectId || ctx.mode
      ? `${ctx.projectId ?? "Ukjent prosjekt"}  |  ${ctx.mode === "lite" ? "Lite-modus" : "Full-modus"}`
      : "Ingen aktivt prosjekt";

  return (
    <div
      style={{
        marginLeft: "auto",
        padding: "4px 12px",
        fontSize: 13,
        color: "#EAECEF",
        opacity: 0.9,
      }}
      title="Aktivt prosjekt / modus"
    >
      {label}
    </div>
  );
}
// ==== [BLOCK: TopbarIndicator] END ====
