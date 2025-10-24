import * as React from "react";

export type ToolbarCommand = {
  id: string;
  label: string;
  hint?: string;
};

export interface ToolbarCoreProps {
  commands: ToolbarCommand[];
  onCommand?: (id: string) => void;
}

export function ToolbarCore(props: ToolbarCoreProps): React.ReactElement;

declare const _default: typeof ToolbarCore;
export default _default;
