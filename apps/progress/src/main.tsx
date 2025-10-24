/* ==== [BLOCK: Imports] BEGIN ==== */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/** Shell + global base-css */
import "../../../packages/platform-shell/src/index.css";
import { ShellLayout } from "../../../packages/platform-shell/src/layout/ShellLayout";

/** Hub-view (for Hub-rute) */
import { HubView } from "../../../packages/platform-shell/src/hub/HubView";

/** Bridge-overlay som leser URL-param fra Hub */
import { HubBridgeOverlay } from "./bridge/HubBridgeOverlay";
/* ==== [BLOCK: Imports] END ==== */

/* ==== [BLOCK: Helpers] BEGIN ==== */
function isHubView(): boolean {
  const qp = new URLSearchParams(window.location.search);
  return qp.get("view") === "hub";
}
/* ==== [BLOCK: Helpers] END ==== */

/* ==== [BLOCK: Mount] BEGIN ==== */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isHubView() ? (
      <ShellLayout chrome="shell" showSidebar>
        <HubView />
      </ShellLayout>
    ) : (
      <ShellLayout chrome="app">
        {/* Overlayen er passiv og vises kun hvis URL-en inneholder context-parametre */}
        <HubBridgeOverlay />
        <App />
      </ShellLayout>
    )}
  </React.StrictMode>
);
/* ==== [BLOCK: Mount] END ==== */
