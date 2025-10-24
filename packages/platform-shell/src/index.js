// ==== [BLOCK: Imports] BEGIN ====
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Meta] BEGIN ====
export const SHELL_NAME = "PlatformShell";
export const SHELL_VERSION = "0.0.2";
// ==== [BLOCK: Meta] END ====

// ==== [BLOCK: Tokens/Theme] BEGIN ====
export const tokens = {
  color: {
    bg: "#0f0f10",
    panel: "#17181a",
    header: "#141516",
    text: "#f2f2f2",
    accent: "#ffcc66",
    border: "#2a2b2e",
    toastBg: "#202124"
  },
  radius: { card: 8 },
  space: { xs: 4, sm: 8, md: 16, lg: 24 }
};
// ==== [BLOCK: Tokens/Theme] END ====

// ==== [BLOCK: i18n] BEGIN ====
// Minimal i18n: enkelt key-value lager. Én språkfil (nb) i egen fil.
const NB = {
  "app.title": "MorningCoffee – System",
  "header.help": "Hjelp",
  "panel.helpTitle": "Hjelp",
  "panel.close": "Lukk"
};
const EN = {
  "app.title": "MorningCoffee – System",
  "header.help": "Help",
  "panel.helpTitle": "Help",
  "panel.close": "Close"
};

let DICT = { nb: NB, en: EN };
let CURRENT_LOCALE = "nb";

export function initI18n(locale = "nb") {
  CURRENT_LOCALE = DICT[locale] ? locale : "nb";
}

function translate(key) {
  const table = DICT[CURRENT_LOCALE] || NB;
  return table[key] || key;
}
// ==== [BLOCK: i18n] END ====

// ==== [BLOCK: Context] BEGIN ====
const ShellCtx = createContext(null);

export function ShellProvider({ config, children }) {
  const [locale, setLocale] = useState(config?.locale || "nb");
  const [helpOpen, setHelpOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // hold i18n state synk med CURRENT_LOCALE
  React.useEffect(() => {
    initI18n(locale);
  }, [locale]);

  const pushToast = useCallback((msg) => {
    setToasts((q) => [...q, { id: Date.now() + Math.random(), msg }]);
    // Automatisk auto-close etter 3s (stub)
    setTimeout(() => {
      setToasts((q) => q.slice(1));
    }, 3000);
  }, []);

  const openHelp = useCallback(() => setHelpOpen(true), []);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  const value = useMemo(() => ({
    mode: config?.mode || "standalone",
    orgId: config?.orgId ?? null,
    projectId: config?.projectId ?? null,
    locale,
    setLocale,
    t: translate,
    openHelp,
    pushToast
  }), [config?.mode, config?.orgId, config?.projectId, locale, openHelp, pushToast]);

  // Layout chrome + overlays (help + toast) pakkes rundt children
  return React.createElement(
    ShellCtx.Provider,
    { value },
    children,
    React.createElement(ToastHost, { items: toasts }),
    helpOpen ? React.createElement(HelpPanel, { onClose: closeHelp }) : null
  );
}

export function useShell() {
  const ctx = useContext(ShellCtx);
  if (!ctx) throw new Error("useShell must be used within <ShellProvider>");
  return ctx;
}
// ==== [BLOCK: Context] END ====

// ==== [BLOCK: Layout/Header] BEGIN ====
function Header({ title }) {
  const { t, openHelp } = useShell();
  const styles = {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `${tokens.space.sm}px ${tokens.space.md}px`,
      background: tokens.color.header,
      borderBottom: `1px solid ${tokens.color.border}`,
      color: tokens.color.text,
      position: "sticky",
      top: 0,
      zIndex: 10
    },
    left: { fontWeight: 700 },
    rightBtn: {
      border: `1px solid ${tokens.color.border}`,
      padding: "8px 12px",
      borderRadius: 8,
      cursor: "pointer",
      background: tokens.color.accent,     // tydelig kontrast
      color: "#111",                        // mørk tekst mot lys knapp
      fontWeight: 600,
      boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
      outline: "none"
    }
  };
  return React.createElement(
    "div",
    { style: styles.root },
    React.createElement("div", { style: styles.left }, title || translate("app.title")),
    React.createElement(
      "button",
      { style: styles.rightBtn, onClick: openHelp },
      translate("header.help")
    )
  );
}

export function ProjectLayout({ title, content }) {
  const styles = {
    page: { background: tokens.color.bg, minHeight: "100vh", color: tokens.color.text },
    main: { padding: tokens.space.md }
  };
  return React.createElement(
    "div",
    { style: styles.page },
    React.createElement(Header, { title }),
    React.createElement("main", { style: styles.main }, content || null)
  );
}
// ==== [BLOCK: Layout/Header] END ====

// ==== [BLOCK: HelpPanel Stub] BEGIN ====
function HelpPanel({ onClose }) {
  const { t } = useShell();
  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50
    },
    panel: {
      width: "min(640px, 92vw)",
      background: tokens.color.panel,
      border: `1px solid ${tokens.color.border}`,
      borderRadius: tokens.radius.card,
      padding: tokens.space.md,
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
    },
    h: { marginTop: 0, marginBottom: tokens.space.sm, color: tokens.color.accent },
    p: { opacity: 0.9, lineHeight: 1.45 },
    row: { display: "flex", justifyContent: "flex-end", marginTop: tokens.space.md },
    btn: {
      border: `1px solid ${tokens.color.border}`,
      padding: "8px 12px",
      borderRadius: 6,
      cursor: "pointer",
      background: tokens.color.header,
      color: tokens.color.text
    }
  };
  return React.createElement(
    "div",
    { style: styles.overlay, role: "dialog", "aria-modal": "true" },
    React.createElement(
      "div",
      { style: styles.panel },
      React.createElement("h2", { style: styles.h }, t("panel.helpTitle")),
      React.createElement(
        "p",
        { style: styles.p },
        "Dette er et hjelpepanelet (stub). Innhold og lenker kommer i Etappe C."
      ),
      React.createElement(
        "div",
        { style: styles.row },
        React.createElement("button", { style: styles.btn, onClick: onClose }, t("panel.close"))
      )
    )
  );
}
// ==== [BLOCK: HelpPanel Stub] END ====

// ==== [BLOCK: Toast Stub] BEGIN ====
function ToastHost({ items }) {
  const styles = {
    host: {
      position: "fixed",
      top: 12,
      right: 12,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      zIndex: 60
    },
    item: {
      background: tokens.color.toastBg,
      border: `1px solid ${tokens.color.border}`,
      color: tokens.color.text,
      padding: "8px 12px",
      borderRadius: 6,
      boxShadow: "0 6px 24px rgba(0,0,0,0.35)"
    }
  };
  return React.createElement(
    "div",
    { style: styles.host },
    ...(items || []).map((t) =>
      React.createElement("div", { key: t.id, style: styles.item }, String(t.msg))
    )
  );
}
// ==== [BLOCK: Toast Stub] END ====

// ==== [BLOCK: Public helpers] BEGIN ====
export function getShellInfo() {
  return { name: SHELL_NAME, version: SHELL_VERSION };
}

export default {
  ProjectLayout,
  ShellProvider,
  useShell,
  tokens,
  initI18n
};
// ==== [BLOCK: Public helpers] END ====
