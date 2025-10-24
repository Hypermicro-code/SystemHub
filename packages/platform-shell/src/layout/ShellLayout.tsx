// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
import { getAppMode } from "../utils/mode";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
// Placeholder-komponenter (kan kobles senere)
import { HelpPanel } from "../components/HelpPanel";
import { ToastContainer } from "../components/ToastContainer";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Props] BEGIN ====
export type ShellLayoutProps = {
  /** Her mountes app-innhold (Progress etc.) */
  children: React.ReactNode;
  /** Valgfritt: slå av/av på sidebar i system-mode */
  showSidebar?: boolean;
};
// ==== [BLOCK: Props] END ====

// ==== [BLOCK: Component] BEGIN ====
export function ShellLayout({ children, showSidebar = true }: ShellLayoutProps) {
  const mode = getAppMode();
  const isSystem = mode === "system";

  return (
    <div className={`mcl-shell ${isSystem ? "mode-system" : "mode-standalone"}`}>
      {/* TOPPLINJE (skjules i standalone) */}
      {isSystem && <Topbar />}

      <div className="mcl-shell-body">
        {/* SIDEBAR (skjules i standalone eller hvis showSidebar=false) */}
        {isSystem && showSidebar && <Sidebar />}

        {/* HOVEDINNHOLD */}
        <main className="mcl-shell-content">
          {children}
        </main>
      </div>

      {/* HJELP & TOAST – usynlig inntil vi aktiverer de */}
      <HelpPanel />
      <ToastContainer />
    </div>
  );
}
// ==== [BLOCK: Component] END ====
