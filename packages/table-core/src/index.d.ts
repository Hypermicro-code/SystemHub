import * as React from "react";

export type TableColumn = {
  key: string;
  title: string;
  width?: number;
};

export type TableRow = Record<string, any>;

export interface TableCoreProps {
  columns: TableColumn[];
  rows: TableRow[];
  onRowsChange?: (next: TableRow[]) => void;
}

export function TableCore(props: TableCoreProps): React.ReactElement;

declare const _default: typeof TableCore;
export default _default;
