// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
import { TopbarIndicator } from "../components/TopbarIndicator";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Component] BEGIN ====
function ShellLayout({
  chrome = "app",
  showSidebar = false,
  children,
}: {
  chrome?: "app" | "shell";
  showSidebar?: boolean;
  children: React.ReactNode;
}) {
  const isHub = chrome === "shell";
  const base = "./?view=hub";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#101214",
      }}
    >
      {/* === Toppbar === */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#17181B",
          borderBottom: "1px solid #2A2E34",
          height: 40,
          padding: "0 10px",
        }}
      >
        <div style={{ fontWeight: 600 }}>
          {isHub ? "Manage Plattform" : "Manage Progress"}
        </div>
        <TopbarIndicator />
      </header>

      {/* === Hovedinnhold === */}
      <div style={{ display: "flex", flex: 1 }}>
        {isHub && showSidebar && (
          <aside
            style={{
              width: 220,
              borderRight: "1px solid #2A2E34",
              background: "#141518",
              color: "#AAA",
              padding: 12,
            }}
          >
            <div style={{ opacity: 0.8, fontSize: 13, marginBottom: 6 }}>
              Navigasjon
            </div>
            <nav style={{ display: "grid", gap: 6 }}>
              <a className="mcl-nav-link" href={`${base}&page=dashboard`}>🏠 Oversikt</a>
              <a className="mcl-nav-link" href={`${base}&page=projects`}>📁 Prosjekter</a>
              <a className="mcl-nav-link" href={`${base}&page=reports`}>📊 Rapporter</a>
              <a className="mcl-nav-link" href={`${base}&page=org`}>👥 Organisasjon</a>
            </nav>
          </aside>
        )}
        <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
// ==== [BLOCK: Component] END ====

// ==== [BLOCK: Export] BEGIN ====
export { ShellLayout };
// ==== [BLOCK: Export] END ====
