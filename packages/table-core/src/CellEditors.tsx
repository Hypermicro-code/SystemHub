// ==== [BLOCK: table-core/CellEditors] BEGIN ====
import React from "react";

type CommonProps<T = any> = {
  value: T;
  autoFocus?: boolean;
  onChange: (v: T) => void;
  onEnter: () => void;
  onEscape: () => void;
  onBlur: () => void;
};

function handleKeys(e: React.KeyboardEvent, onEnter: () => void, onEscape: () => void) {
  if (e.key === "Enter") { e.preventDefault(); onEnter(); }
  if (e.key === "Escape") { e.preventDefault(); onEscape(); }
}

export function TextEditor(props: CommonProps<string>) {
  return (
    <input
      autoFocus={props.autoFocus}
      value={props.value ?? ""}
      onChange={(e) => props.onChange(e.target.value)}
      onKeyDown={(e) => handleKeys(e, props.onEnter, props.onEscape)}
      onBlur={props.onBlur}
      style={{ width: "100%", height: 28, padding: "0 6px", boxSizing: "border-box" }}
    />
  );
}

export function NumberEditor(props: CommonProps<number>) {
  return (
    <input
      type="number"
      autoFocus={props.autoFocus}
      value={props.value ?? 0}
      onChange={(e) => props.onChange(e.target.value === "" ? ("" as any) : Number(e.target.value))}
      onKeyDown={(e) => handleKeys(e, props.onEnter, props.onEscape)}
      onBlur={props.onBlur}
      style={{ width: "100%", height: 28, padding: "0 6px", boxSizing: "border-box" }}
    />
  );
}

export function DateEditor(props: CommonProps<string>) {
  const val = props.value ? String(props.value).slice(0, 10) : "";
  return (
    <input
      type="date"
      autoFocus={props.autoFocus}
      value={val}
      onChange={(e) => props.onChange(e.target.value)}
      onKeyDown={(e) => handleKeys(e, props.onEnter, props.onEscape)}
      onBlur={props.onBlur}
      style={{ width: "100%", height: 28, padding: "0 6px", boxSizing: "border-box" }}
    />
  );
}

export function SelectEditor(props: CommonProps<string> & { options?: Array<{ value: string; label: string }> }) {
  const opts = props.options ?? [];
  const cur = props.value ?? (opts[0]?.value ?? "");
  return (
    <select
      autoFocus={props.autoFocus}
      value={cur}
      onChange={(e) => props.onChange(e.target.value)}
      onKeyDown={(e) => handleKeys(e, props.onEnter, props.onEscape)}
      onBlur={props.onBlur}
      style={{ width: "100%", height: 28, padding: "0 6px", boxSizing: "border-box" }}
    >
      {opts.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function ColorEditor(props: CommonProps<string>) {
  return (
    <input
      type="color"
      autoFocus={props.autoFocus}
      value={props.value ?? "#888888"}
      onChange={(e) => props.onChange(e.target.value)}
      onKeyDown={(e) => handleKeys(e, props.onEnter, props.onEscape)}
      onBlur={props.onBlur}
      style={{ width: "100%", height: 28, padding: 0, boxSizing: "border-box" }}
    />
  );
}
// ==== [BLOCK: table-core/CellEditors] END ====
