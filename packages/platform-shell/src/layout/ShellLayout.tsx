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
          {chrome === "shell" ? "Manage Plattform" : "Manage Progress"}
        </div>
        <TopbarIndicator />
      </header>

      {/* === Hovedinnhold === */}
      <div style={{ display: "flex", flex: 1 }}>
        {showSidebar && (
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
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>🏠 Oversikt</li>
              <li>📁 Prosjekter</li>
              <li>📊 Rapporter</li>
              <li>👥 Organisasjon</li>
            </ul>
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
