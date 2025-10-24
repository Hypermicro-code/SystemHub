// ==== [BLOCK: Hub Data Stub] BEGIN ====
export type Project = {
  id: string;          // f.eks. "P-1004"
  name: string;        // visningsnavn
  createdAt: string;   // ISO
  status?: "active" | "archived";
};

const LS_KEY = "mcl.hub.projects.v1";

const DEFAULTS: Project[] = [
  { id: "P-1001", name: "Kjøsnesfjorden – Kontrollsystem", createdAt: "2025-01-01T00:00:00Z", status: "active" },
  { id: "P-1002", name: "Lang-Sima – Turbinrunnere",        createdAt: "2025-01-02T00:00:00Z", status: "active" },
  { id: "P-1003", name: "Hodnaberg – Fordelinger",           createdAt: "2025-01-03T00:00:00Z", status: "active" },
];

export function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULTS.slice();
    const arr = JSON.parse(raw) as Project[];
    if (!Array.isArray(arr)) return DEFAULTS.slice();
    return arr;
  } catch {
    return DEFAULTS.slice();
  }
}

export function saveProjects(list: Project[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

export function createProject(name: string): Project {
  const list = loadProjects();
  // Finn neste ledige P-nummer
  const max = list
    .map(p => Number((p.id || "").replace(/[^0-9]/g, "")) || 0)
    .reduce((a, b) => Math.max(a, b), 1000);
  const nextId = `P-${max + 1}`;
  const proj: Project = {
    id: nextId,
    name,
    createdAt: new Date().toISOString(),
    status: "active",
  };
  const next = [...list, proj];
  saveProjects(next);
  return proj;
}

export function getProject(id: string): Project | null {
  return loadProjects().find(p => p.id === id) ?? null;
}

export function updateProjectName(id: string, name: string) {
  const list = loadProjects().map(p => (p.id === id ? { ...p, name } : p));
  saveProjects(list);
}

export function archiveProject(id: string) {
  const list = loadProjects().map(p => (p.id === id ? { ...p, status: "archived" } : p));
  saveProjects(list);
}
// ==== [BLOCK: Hub Data Stub] END ====
