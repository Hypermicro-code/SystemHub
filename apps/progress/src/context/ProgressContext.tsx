// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Types] BEGIN ====
export type ProgressCtx = {
  projectId?: string;
  orgId?: string;
  locale?: string;
  setContext: (patch: Partial<Pick<ProgressCtx, "projectId" | "orgId" | "locale">>) => void;
};
// ==== [BLOCK: Types] END ====

// ==== [BLOCK: Helpers] BEGIN ====
function qp(k: string): string | undefined {
  const v = new URLSearchParams(window.location.search).get(k);
  return v ?? undefined;
}
function readFromUrl(): Partial<ProgressCtx> {
  return {
    projectId: qp("projectId"),
    orgId: qp("orgId"),
    locale: qp("locale"),
  };
}
const LS_KEY = "mcl.progress.ctx";
// ==== [BLOCK: Helpers] END ====

// ==== [BLOCK: Context] BEGIN ====
const Ctx = React.createContext<ProgressCtx>({
  setContext: () => {},
});
// ==== [BLOCK: Context] END ====

// ==== [BLOCK: Provider] BEGIN ====
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  // initial: URL trumfer localStorage
  const urlSeed = readFromUrl();
  const lsSeed = safeReadLS();
  const initial = { ...lsSeed, ...urlSeed };

  const [state, setState] = React.useState<Omit<ProgressCtx, "setContext">>({
    projectId: initial.projectId,
    orgId: initial.orgId,
    locale: initial.locale,
  });

  // oppdater localStorage når context endres
  React.useEffect(() => {
    safeWriteLS({ projectId: state.projectId, orgId: state.orgId, locale: state.locale });
  }, [state.projectId, state.orgId, state.locale]);

  // lytt på postMessage fra Hub (overlay eller senere direkte)
  React.useEffect(() => {
    function onMessage(e: MessageEvent) {
      const m = e?.data;
      if (!m || typeof m !== "object") return;
      if (m.type !== "mcl:progress:setContext") return;
      const p = (m as any).payload || {};
      setState(s => ({
        ...s,
        projectId: p.projectId ?? s.projectId,
        orgId: p.orgId ?? s.orgId,
        locale: p.locale ?? s.locale,
      }));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // lytt på URL-endringer (tilfelle man navigerer i samme fane)
  React.useEffect(() => {
    const onPop = () => {
      const u = readFromUrl();
      if (u.projectId || u.orgId || u.locale) {
        setState(s => ({ ...s, ...u }));
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const value: ProgressCtx = {
    ...state,
    setContext: (patch) => setState(s => ({ ...s, ...patch })),
  };

  // liten dev-hjelp i konsoll:
  (window as any).mclProgress = {
    getContext: () => ({ ...value }),
    setContext: (p: any) => value.setContext(p),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
// ==== [BLOCK: Provider] END ====

// ==== [BLOCK: Hook] BEGIN ====
export function useProgressCtx() {
  return React.useContext(Ctx);
}
// ==== [BLOCK: Hook] END ====


// ==== [BLOCK: LS helpers] BEGIN ====
function safeReadLS(): Partial<ProgressCtx> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw);
    if (o && typeof o === "object") {
      return {
        projectId: typeof o.projectId === "string" ? o.projectId : undefined,
        orgId: typeof o.orgId === "string" ? o.orgId : undefined,
        locale: typeof o.locale === "string" ? o.locale : undefined,
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
// ==== [BLOCK: LS helpers] END ====
