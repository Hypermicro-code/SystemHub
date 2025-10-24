// ==== [BLOCK: Hub Nav Utils] BEGIN ====
export function getQueryParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

export function setQueryParams(patch: Record<string, string | null | undefined>) {
  const url = new URL(window.location.href);
  const qs = url.searchParams;
  Object.entries(patch).forEach(([k, v]) => {
    if (v === null || v === undefined) qs.delete(k);
    else qs.set(k, String(v));
  });
  // Sørg for at vi forblir i hub
  if (!qs.get("view")) qs.set("view", "hub");
  window.history.pushState({}, "", `${url.pathname}?${qs.toString()}`);
  // Enkelt rerender-signal:
  window.dispatchEvent(new Event("popstate"));
}

/** Hent nettleserens locale i form som passer URL (f.eks. nb-NO eller en-US). */
export function getBrowserLocale(): string {
  const lng = (navigator?.language || navigator?.languages?.[0] || "nb-NO");
  // Normaliser enkel språk-kode til stor landsdel: en -> en-US, nb -> nb-NO
  if (lng.includes("-")) return lng;
  if (lng.toLowerCase() === "en") return "en-US";
  if (lng.toLowerCase() === "nb" || lng.toLowerCase() === "no") return "nb-NO";
  return lng;
}
// ==== [BLOCK: Hub Nav Utils] END ====
