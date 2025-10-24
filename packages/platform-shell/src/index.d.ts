import * as React from "react";

export type ShellMode = "standalone" | "system";

export interface ShellConfig {
  mode: ShellMode;
  orgId?: string | null;
  projectId?: string | null;
  locale?: string;
  title?: string;
}

export interface ShellContextValue extends Required<Pick<ShellConfig, "mode" | "locale">> {
  orgId: string | null;
  projectId: string | null;
  setLocale: (next: string) => void;
  t: (key: string) => string;
  openHelp: () => void;
  pushToast: (msg: string) => void;

  /** App registrerer en handler for kommandoer fra shell */
  setAppCommandHandler: (fn: (cmd: { name: string; payload?: any }) => void) => void;
  /** Shell sender en kommando til app */
  emitAppCommand: (name: string, payload?: any) => void;
}

export const SHELL_NAME: "PlatformShell";
export const SHELL_VERSION: string;

export function ShellProvider(props: {
  config: ShellConfig;
  children: React.ReactNode;
}): React.ReactElement;

export function useShell(): ShellContextValue;

export interface ProjectLayoutProps {
  title?: string;
  content?: React.ReactNode; // mount-slot (fra appens router)
}

export function ProjectLayout(props: ProjectLayoutProps): React.ReactElement;

export const tokens: {
  color: {
    bg: string;
    panel: string;
    header: string;
    text: string;
    accent: string;
    border: string;
    toastBg: string;
  };
  radius: { card: number };
  space: { xs: number; sm: number; md: number; lg: number };
};

export function initI18n(locale?: string): void;

export function getShellInfo(): { name: string; version: string };

declare const _default: {
  ProjectLayout: typeof ProjectLayout;
  ShellProvider: typeof ShellProvider;
  useShell: typeof useShell;
  tokens: typeof tokens;
  initI18n: typeof initI18n;
};
export default _default;
