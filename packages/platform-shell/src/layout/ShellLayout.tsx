// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
import { getAppMode } from "../utils/mode";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { HelpPanel } from "../components/HelpPanel";
import { ToastContainer } from "../components/ToastContainer";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Types] BEGIN ====
export type ChromeMode = "auto" | "shell" | "app";
export type ShellLayoutProps = {
  /** App-innhold (Progress etc.) */
  children: React.ReactNode;
  /** Når chrome="shell" kan vi vise sidebar i system-mode */
  showSidebar?: boolean;
  /**
   * "app"   = ikke vis Shell-topbar/sidebar (bruk appens egen chrome) [DEFAULT]
   * "shell" = vis Shell-topbar/sidebar (for Hub)
   * "auto"  = shell i system-mode, ellers app
   */
  chrome?: ChromeMode;
};
// ==== [BLOCK: Types] END ====

// ==== [BLOCK: Component] BEGIN ====
export function ShellLayout({
  children,
  showSidebar = true,
  chrome = "app", // Viktig: default "app" for å IKKE overstyre Progress sin chrome
}: ShellLayoutProps) {
  const mode = getAppMode(); // "system" | "standalone"

  // Bestem faktisk chrome-modus:
  const effective: Exclude<ChromeMode, "auto"> =
    chrome === "auto" ? (mode === "system" ? "shell" : "app") : chrome;

  const isShellChrome = effective === "shell";

  return (
    <div className={`mcl-shell ${mode === "system" ? "mode-system" : "mode-standalone"}`}>
      {/* Shell-topbar kun når vi eksplisitt ber om den */}
      {isShellChrome && <Topbar />}

      <div className="mcl-shell-body" style={{ gridTemplateColumns: isShellChrome && showSidebar ? undefined : "1fr" }}>
        {/* Sidebar kun i shell-chrome */}
        {isShellChrome && showSidebar && <Sidebar />}

        {/* HOVEDINNHOLD (Progress e.l.) */}
        <main className="mcl-shell-content">{children}</main>
      </div>

      {/* Stubs – ingen visuell effekt før vi skrur de på senere */}
      <HelpPanel />
      <ToastContainer />
    </div>
  );
}
// ==== [BLOCK: Component] END ====
