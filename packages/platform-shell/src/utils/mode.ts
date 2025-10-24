// ==== [BLOCK: Mode Utils] BEGIN ====
export type AppMode = "system" | "standalone";

/** Hent modus fra ?mode=… eller Vite env (VITE_APP_MODE). */
export function getAppMode(): AppMode {
  const qp = new URLSearchParams(window.location.search).get("mode");
  if (qp === "system" || qp === "standalone") return qp;

  const env = (import.meta as any)?.env?.VITE_APP_MODE as string | undefined;
  if (env === "system" || env === "standalone") return env;

  return "system";
}
// ==== [BLOCK: Mode Utils] END ====
