import React from "react";

export type ProgressCtx = {
  projectId?: string;
  orgId?: string;
  mode?: "lite" | "full";
  setContext: (patch: Partial<Pick<ProgressCtx, "projectId" | "orgId" | "mode">>) => void;
};

function qp(k: string): string | undefined {
  const v = new URLSearchParams(window.location.search).get(k);
  return v ?? undefined;
}
function readFromUrl(): Partial<ProgressCtx> {
  return {
    projectId: qp("projectId"),
    orgId: qp("orgId"),
    mode: qp("mode") as "lite" | "full" | undefined,
  };
}
const LS_KEY = "mcl.progress.ctx";

const Ctx = React.createContext<ProgressCtx>({
  setContext: () => {},
});

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const urlSeed = readFromUrl();
  const lsSeed = safeReadLS();
  const initial = { ...lsSeed, ...urlSeed };

  const [state, setState] = React.useState<Omit<ProgressCtx, "setContext">>({
    projectId: initial.projectId,
    orgId: initial.orgId,
    mode: initial.mode ?? "full",
  });

  // Persist + broadcast på alle endringer
  React.useEffect(() => {
    safeWriteLS({
      projectId: state.projectId,
      orgId: state.orgId,
      mode: state.mode,
    });
    // 🔊 Broadcast til Shell/indikator
    try {
      window.dispatchEvent(new CustomEvent("mcl:progress:ctx", { detail: { ...state } }));
    } catch {}
  }, [state]);

  React.useEffect(() => {
    function onMessage(e: MessageEvent) {
      const m = e?.data;
      if (m?.type !== "mcl:progress:setContext") return;
      const p = (m as any).payload || {};
      setState(s => ({
        ...s,
        projectId: p.projectId ?? s.projectId,
        orgId: p.orgId ?? s.orgId,
        mode: p.mode ?? s.mode,
      }));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  React.useEffect(() => {
    const onPop = () => {
      const u = readFromUrl();
      if (u.projectId || u.orgId || u.mode) setState(s => ({ ...s, ...u }));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const value: ProgressCtx = {
    ...state,
    setContext: patch => setState(s => ({ ...s, ...patch })),
  };

  (window as any).mclProgress = {
    getContext: () => ({ ...value }),
    setContext: (p: any) => value.setContext(p),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProgressCtx() {
  return React.useContext(Ctx);
}

function safeReadLS(): Partial<ProgressCtx> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw);
    if (o && typeof o === "object") {
      return {
        projectId: o.projectId,
        orgId: o.orgId,
        mode: o.mode,
      };
    }
  } catch {}
  return {};
}

function safeWriteLS(v: Partial<ProgressCtx>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(v));
  } catch {}
}
