// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
import { TopbarIndicator } from "../topbar/TopbarIndicator";
// ==== [BLOCK: Imports] END ====

export function ShellLayout({
  children,
  chrome = "app",
  showSidebar = false,
}: {
  children: React.ReactNode;
  chrome?: "app" | "shell";
  showSidebar?: boolean;
}) {
  return (
    <div
      className={`shell-root shell-${chrome}`}
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100vh",
        background: "#101214",
        color: "#EAECEF",
      }}
    >
      {/* ==== [BLOCK: Topbar] BEGIN ==== */}
      <header
        style={{
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#1A1D21",
          borderBottom: "1px solid #2A2E34",
          padding: "0 16px",
        }}
      >
        <div style={{ fontWeight: 600 }}>Manage Plattformen</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TopbarIndicator />
        </div>
      </header>
      {/* ==== [BLOCK: Topbar] END ==== */}

      {/* ==== [BLOCK: Body] BEGIN ==== */}
      <main
        style={{
          display: "grid",
          gridTemplateColumns: showSidebar ? "240px 1fr" : "1fr",
          height: "100%",
        }}
      >
        {showSidebar && (
          <aside
            style={{
              background: "#17181B",
              borderRight: "1px solid #2A2E34",
              padding: 12,
            }}
          >
            (Sidebar)
          </aside>
        )}
        <section style={{ overflow: "auto" }}>{children}</section>
      </main>
      {/* ==== [BLOCK: Body] END ==== */}
    </div>
  );
}
