import * as React from "react";

export type ShellMode = "standalone" | "system";

export interface ShellConfig {
  mode: ShellMode;
  orgId?: string | null;
  projectId?: string | null;
  title?: string;
}

export interface ShellContextValue extends Required<Pick<ShellConfig, "mode">> {
  orgId: string | null;
  projectId: string | null;
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
  content?: React.ReactNode; // mount-slot
}
export function ProjectLayout(props: ProjectLayoutProps): React.ReactElement;

export type ProjectListItem = { id: string; name: string; code?: string };

export interface ProjectListProps {
  items: ProjectListItem[];
  onSelect?: (item: ProjectListItem) => void;
}

export function ProjectList(props: ProjectListProps): React.ReactElement;

export const tokens: {
  color: {
    bg: string;
    panel: string;
    header: string;
    text: string;
    accent: string;
    border: string;
    toastBg: string;
    hover: string;
  };
  radius: { card: number };
  space: { xs: number; sm: number; md: number; lg: number };
  shadow: { card: string };
};

export function getShellInfo(): { name: string; version: string };

declare const _default: {
  ProjectLayout: typeof ProjectLayout;
  ProjectList: typeof ProjectList;
  ShellProvider: typeof ShellProvider;
  useShell: typeof useShell;
  tokens: typeof tokens;
};
export default _default;
