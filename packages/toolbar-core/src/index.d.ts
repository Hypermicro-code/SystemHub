import * as React from "react";
import type { ToolbarContext, SlotInjection, ToolbarGroupDef, Command, Role } from "./core/types";

export type { ToolbarContext, SlotInjection, ToolbarGroupDef, Command, Role };
export {
  registerCommands,
  getCommand,
  getCommandsByIds,
  unregisterCommand,
  clearCommands,
  getAllCommands,
} from "./core/CommandRegistry";

export interface ToolbarCoreProps {
  ctx: ToolbarContext;
  slots?: SlotInjection[];
  projectName?: string;
  status?: "saved" | "autosave" | "offline";
  headerRight?: React.ReactNode;
  maxWidth?: string | number;
}

export function ToolbarCore(props: ToolbarCoreProps): React.ReactElement;

declare const _default: typeof ToolbarCore;
export default _default;
