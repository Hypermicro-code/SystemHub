import React from "react";
import { PlatformShell } from "@hypermicro-code/platform-shell";

export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginBottom: 16, color: "#ffcc66" }}>
        SystemHub Progress starter
      </h1>
      <PlatformShell
        title="Integrasjonstest"
        subtitle="Import fra @hypermicro-code/platform-shell fungerer!"
        style={{ border: "2px solid #ffcc66" }}
      />
    </div>
  );
}
