import * as React from "react";
import type { ColumnDef, Selection, KeyBindings } from "./types";

export type { ColumnDef, Selection, KeyBindings };

export type RowLike = { id: string; [key: string]: any };

export interface TableCoreProps {
  columns: ColumnDef[];
  rows: RowLike[];
  readonly?: boolean;
  selection?: Selection;
  keymap?: KeyBindings;
  onPatch?: (patch: { rowId: string; colId: string; oldValue: any; nextValue: any }) => void;
  onSelectionChange?: (sel: Selection) => void;
  onCommit?: () => void;
}

export function TableCore(props: TableCoreProps): React.ReactElement;

declare const _default: typeof TableCore;
export default _default;
