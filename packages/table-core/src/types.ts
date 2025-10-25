// ==== [BLOCK: table-core/types] BEGIN ====
export type ColumnType = "text" | "number" | "date" | "select" | "color";

export type ColumnDef = {
  id: string;
  header: string | JSX.Element;
  type?: ColumnType;          // default "text"
  width?: number;             // px
  editable?: (row: any) => boolean; // default true
  format?: (value: any, row: any) => string;
  validate?: (nextValue: any, row: any) => string | null;
  // For select
  options?: Array<{ value: string; label: string }>;
};

export type Selection = {
  // Minimal stub – utvides senere ved behov
  rowId?: string;
  colId?: string;
};

export type KeyBindings = {
  // Minimal stub – TableCore kan få dette senere
  [combo: string]: (e: KeyboardEvent) => void;
};
// ==== [BLOCK: table-core/types] END ====
