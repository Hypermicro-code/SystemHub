/* ==== [BLOCK: Imports] BEGIN ==== */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ShellProvider,
  ProjectLayout,
  initI18n
} from "@hypermicro-code/platform-shell";
/* ==== [BLOCK: Imports] END ==== */

/* ==== [BLOCK: Init i18n] BEGIN ==== */
initI18n("nb");
/* ==== [BLOCK: Init i18n] END ==== */

function Placeholder() {
  return (
    <div>
      <p>Shell MVP – Etappe A montert ✅</p>
      <p>Her kommer Progress-innholdet i Etappe B.</p>
    </div>
  );
}

export default function App() {
  return (
    <ShellProvider
      config={{
        mode: "standalone",
        orgId: null,
        projectId: null,
        locale: "nb",
        title: "MorningCoffee – System"
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProjectLayout
                title="Progress"
                content={<Placeholder />}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ShellProvider>
  );
}
