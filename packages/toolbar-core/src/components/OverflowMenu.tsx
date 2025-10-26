import React from "react"
import ToolbarGroup from "./ToolbarGroup"
import { ToolbarContext, ToolbarGroupDef } from "@/core/types"
export default function OverflowMenu({groups, ctx}:{groups: ToolbarGroupDef[]; ctx: ToolbarContext}){
  const [open, setOpen] = React.useState(false)
  return (
    <div className="tb-overflow">
      <button className="tb-btn" aria-haspopup="menu" aria-expanded={open ? "true":"false"} onClick={()=>setOpen(v=>!v)}>
        <span className="tb-icon" aria-hidden="true">⋯</span>
        <span>Flere</span>
      </button>
      {open && (
        <div className="tb-overflow-panel" role="menu">
          {groups.map(g => <ToolbarGroup key={g.id} group={g} ctx={ctx} />)}
        </div>
      )}
    </div>
  )
}
