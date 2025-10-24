/* ==== [BLOCK: Imports] BEGIN ==== */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShellProvider, ProjectLayout, initI18n } from "@hypermicro-code/platform-shell";
import ProgressHome from "./ProgressHome";
/* ==== [BLOCK: Imports] END ==== */

initI18n("nb");

export default function App() {
  const basename = import.meta.env.BASE_URL || "/";
  return (
    <ShellProvider
      config={{
        mode: "standalone",
        orgId: "demo-org",
        projectId: "demo-project",
        locale: "nb",
        title: "MorningCoffee – System"
      }}
    >
      <BrowserRouter basename={basename}>
        <Routes>
          <Route
            path="/"
            element={<ProjectLayout title="Progress" content={<ProgressHome />} />}
          />
          <Route
            path="*"
            element={<ProjectLayout title="Progress" content={<ProgressHome />} />}
          />
        </Routes>
      </BrowserRouter>
    </ShellProvider>
  );
}
