import * as React from "react";

export const SHELL_NAME: "PlatformShell";
export const SHELL_VERSION: string;

export interface PlatformShellProps {
  title?: string;
  subtitle?: string;
  style?: React.CSSProperties;
}

/**
 * Minimal shell-komponent for integrasjonstesting.
 * Byttes ut senere med ekte shell (routing, tema, meny, osv.).
 */
export function PlatformShell(props: PlatformShellProps): React.ReactElement;

export function getShellInfo(): { name: string; version: string };

declare const _default: typeof PlatformShell;
export default _default;
