import React from "react"
import ToolbarGroup from "@/components/ToolbarGroup"
import { ToolbarContext, ToolbarGroupDef, SlotInjection } from "./types"
import { registerCommands } from "./CommandRegistry"
const ICONS = {
  save: "💾",
  import: "⬆️",
  export: "⬇️",
  cut: "✂️",
  copy: "📄",
  paste: "📋",
  undo: "↶",
  redo: "↷",
  delete: "🗑️",
  zoomOut: "➖",
  zoomReset: "🔲",
  zoomIn: "➕",
  filter: "🔍",
  newRow: "➕",
  attachment: "📎",
  indent: "▶️",
  outdent: "◀️",
  help: "❓",
  search: "🔎",
}

/* ===== [BLOCK: Default Commands] ===== */
registerCommands([
  // File
{ id: "toolbar.file.save",   label:"Lagre",        icon: ICONS.save,   group:"file",  shortcut:"Ctrl+S",        run:(ctx)=>alert("Lagre (demo)") },
  { id: "toolbar.file.import", label:"Importer",     icon: ICONS.import, group:"file",                          run:()=>alert("Importer (demo)") },
  { id: "toolbar.file.export", label:"Eksporter",    icon: ICONS.export, group:"file",                          run:()=>alert("Eksporter (demo)") },

  // Edit
  { id:"toolbar.edit.cut",     label:"Klipp",        icon: ICONS.cut,       group:"edit",                          run:()=>alert("Klipp (demo)") },
  { id:"toolbar.edit.copy",    label:"Kopier",       icon: ICONS.copy,      group:"edit",                          run:()=>alert("Kopier (demo)") },
  { id:"toolbar.edit.paste",   label:"Lim inn",      icon: ICONS.paste,     group:"edit",                          run:()=>alert("Lim inn (demo)") },
  { id:"toolbar.edit.undo",    label:"Angre",        icon: ICONS.undo,      group:"edit",  shortcut:"Ctrl+Z",      run:()=>alert("Angre (demo)") },
  { id:"toolbar.edit.redo",    label:"Gjør om",      icon: ICONS.redo,      group:"edit",  shortcut:"Shift+Ctrl+Z", run:()=>alert("Gjør om (demo)") },
  { id:"toolbar.edit.delete",  label:"Slett",        icon: ICONS.delete,    group:"edit",                          run:()=>alert("Slett (demo)") },

  // View
  { id:"toolbar.view.zoomout",  label:"Zoom −",       icon: ICONS.zoomOut,   group:"view", run:()=>alert("Zoom − (demo)") },
  { id:"toolbar.view.zoomreset", label:"100%",        icon: ICONS.zoomReset, group:"view", run:()=>alert("100% (demo)") },
  { id:"toolbar.view.zoomin",   label:"Zoom +",       icon: ICONS.zoomIn,    group:"view", run:()=>alert("Zoom + (demo)") },
  { id:"toolbar.view.filter",   label:"Filter",       icon: ICONS.filter,    group:"view", run:()=>alert("Filter (demo)") },

  // Insert
  { id:"toolbar.insert.newrow",     label:"Ny rad",       icon: ICONS.newRow,      group:"insert", run:()=>alert("Ny rad (demo)") },
  { id:"toolbar.insert.attachment", label:"Vedlegg",      icon: ICONS.attachment, group:"insert", run:()=>alert("Vedlegg (demo)") },

  // Tools (hierarki/rader)
  { id:"toolbar.hierarchy.indent",  label:"Innrykk",     icon: ICONS.indent, group:"tools", run:()=>alert("Innrykk (demo)") },
  { id:"toolbar.hierarchy.outdent", label:"Utrykk",      icon: ICONS.outdent, group:"tools", run:()=>alert("Utrykk (demo)") },

  // Help
  { id:"toolbar.help.shortcuts", label:"Snarveier",    icon: ICONS.help, group:"help", run:()=>alert("Snarveier (demo)") }
])

/* ===== [BLOCK: Groups per tab] ===== */
const GROUPS_MAP: Record<string, ToolbarGroupDef[]> = {
  File:  [ { id:"file-1", commandIds:["toolbar.file.save","toolbar.file.import","toolbar.file.export"] } ],
  Edit:  [
    { id:"edit-1", commandIds:["toolbar.edit.cut","toolbar.edit.copy","toolbar.edit.paste"] },
    { id:"edit-2", commandIds:["toolbar.edit.undo","toolbar.edit.redo","toolbar.edit.delete"] }
  ],
  View:  [
    { id:"view-1", commandIds:["toolbar.view.zoomout","toolbar.view.zoomreset","toolbar.view.zoomin"] },
    { id:"view-2", commandIds:["toolbar.view.filter"] }
  ],
  Insert:[ { id:"ins-1",  commandIds:["toolbar.insert.newrow","toolbar.insert.attachment"] } ],
  Tools: [ { id:"tools-1",commandIds:["toolbar.hierarchy.indent","toolbar.hierarchy.outdent"] } ],
  Help:  [ { id:"help-1", commandIds:["toolbar.help.shortcuts"] } ]
}

type Props = {
  ctx: ToolbarContext
  slots?: SlotInjection[]
  projectName?: string
  status?: "saved" | "autosave" | "offline"
  /** Appen kan sende inn ekstra innhold til høyre i menylinja (f.eks. logo). */
  headerRight?: React.ReactNode
  /** Maks bredde på innhold (f.eks. "1200px" eller "80rem"). Default: full bredde. */
  maxWidth?: string | number
}

export default function ToolbarCore({
  ctx,
  slots = [],
  projectName = "Uten navn",
  status = "saved",
  headerRight,
  maxWidth
}: Props){
  const { t } = useTranslation()
  const tabs = React.useMemo(()=>["File","Project","App","System"],[])
  const [visibleTab, setVisibleTab] = React.useState<string | null>(null)
  const [isClosing, setIsClosing] = React.useState(false)

  const onTabClick = (tab: string) => {
    if (visibleTab === tab && !isClosing) {
      setIsClosing(true)
      window.setTimeout(() => {
        setVisibleTab(null)
        setIsClosing(false)
      }, 260) // matcher "snappy" åpne/lukke (juster etter CSS)
      return
    }
    setIsClosing(false)
    setVisibleTab(tab)
  }

  React.useEffect(() => {
    const el = document.documentElement
    if (visibleTab) el.classList.add("ribbon-open")
    else el.classList.remove("ribbon-open")
    return () => el.classList.remove("ribbon-open")
  }, [visibleTab])

  const slotGroups = slots.flatMap(s => s.groups)
  const groups = React.useMemo(() => {
    if (!visibleTab) return []
    const base = GROUPS_MAP[visibleTab] ?? []
    return [...base, ...slotGroups]
  }, [visibleTab, slotGroups])

  const ribbonClass =
    `ribbon ${!visibleTab ? "ribbon--hidden" : isClosing ? "ribbon--closing" : ""}`

  // Setter CSS-variabel på roten til komponenten, slik at hver app kan styre max-bredef
  const styleVar = maxWidth != null ? ({ ["--toolbar-max-width" as any]: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }) : undefined

  return (
    <div style={styleVar}>
      {/* ===== MENYLINJE ===== */}
      <div className="menubar" role="menubar" aria-label="Hovedmeny">
        <div className="menubar-inner">
          <div className="menu-tabs">
            {tabs.map(tab => {
              const selected = visibleTab === tab && !isClosing
              return (
                <button
                  key={tab}
                  className="menu-tab"
                  role="button"
                  aria-expanded={selected ? "true" : "false"}
                  aria-pressed={selected ? "true" : "false"}
                  onClick={()=>onTabClick(tab)}
                  title={tab}
                >
                  {tab}
                </button>
              )
            })}
          </div>
          <div className="menu-right">
            <span className="status-chip" title={projectName}>
              <span>{projectName}</span>
              <span className={`status-dot ${status==="saved" ? "status-ok" : status==="offline" ? "status-off" : ""}`} />
            </span>
            <span className="status-chip" title="Søk">
              <span className="tb-icon"><Search/></span>
              <span>{t("search.placeholder")}</span>
            </span>
            {headerRight /* app kan injisere logo/innhold */}
          </div>
        </div>
      </div>

      {/* ===== RIBBON (overlay) ===== */}
      <div
        className={ribbonClass}
        role="toolbar"
        aria-label={visibleTab ? `Ribbon: ${visibleTab}` : "Ribbon skjult"}
        aria-hidden={visibleTab ? "false" : "true"}
      >
        <div className="ribbon-inner">
          {visibleTab && groups.map(g => (
            <ToolbarGroup key={`${visibleTab}-${g.id}`} group={g} ctx={ctx} />
          ))}
        </div>
      </div>
    </div>
  )
}
