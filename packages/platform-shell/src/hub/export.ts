// ==== [BLOCK: Hub CSV Export] BEGIN ====
import { loadProjects } from "./data";

function toCsvValue(v: unknown): string {
  if (v == null) return "";
  const s = String(v);
  // Escapér komma/linjeskift/anførselstegn i CSV
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function buildProjectsCsv(): string {
  const rows = loadProjects();
  const header = ["id", "name", "status", "createdAt"];
  const lines = [
    header.join(","), // header
    ...rows.map(r =>
      [r.id, r.name, r.status ?? "active", r.createdAt].map(toCsvValue).join(",")
    ),
  ];
  return lines.join("\n");
}

export function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
// ==== [BLOCK: Hub CSV Export] END ====
