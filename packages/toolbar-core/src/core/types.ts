import { ReactNode } from "react"

export type Role = "admin" | "kontor" | "felt"

export type ToolbarContext = {
  role: Role
  online: boolean
  dirty: boolean
  selection?: { rows: number[]; cols?: number[] }
  zoom: number
  density: "compact" | "comfortable"
  app: "progress" | "estimates" | "documents" | "generic"
}

export type CommandRun = (ctx: ToolbarContext, payload?: unknown) => void | Promise<void>

export type Command = {
  id: string                         // f.eks. "toolbar.file.save"
  label: string                      // direkte etikett
  icon?: ReactNode                   // ikon-element (emoji eller React-node)
  shortcut?: string                  // "Ctrl+S"
  group: string                      // "file", "edit", "view", "hierarchy", ...
  isEnabled?: (ctx: ToolbarContext) => boolean
  isVisible?: (ctx: ToolbarContext) => boolean
  run: CommandRun
  pressed?: (ctx: ToolbarContext) => boolean
}

export type ToolbarGroupDef = {
  id: string
  commandIds: string[]
}

export type SlotArea = "left" | "center" | "right"

export type SlotInjection = {
  area: SlotArea
  order: number
  tab?: string
  groups: ToolbarGroupDef[]
}
