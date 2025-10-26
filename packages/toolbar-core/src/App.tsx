import React from "react"
import "./index.css"
import ToolbarCore from "./core/ToolbarCore"
import { registerCommands } from "./core/CommandRegistry"
import { ToolbarContext, SlotInjection } from "./core/types"
const DEMO_ICONS = {
  planning: "🗂️",
  vat: "💰",
}

export default function App(){
  const [ctx, setCtx] = React.useState<ToolbarContext>({
    role: "admin",
    online: true,
    dirty: false,
    zoom: 1,
    density: "comfortable",
    app: "generic"
  })

  // Demo: app-spesifikke kommandoer som injiseres i ribbon
  React.useEffect(()=>{
    registerCommands([
     { id:"planning.timescale", label:"Planning", icon: DEMO_ICONS.planning, group:"planning",  run:()=>alert("Timeskala (demo)") },
      { id:"estimates.vat",     label:"MVA",      icon: DEMO_ICONS.vat,       group:"estimates", run:()=>alert("MVA-profil (demo)") }
    ])
  },[])

  const slots: SlotInjection[] = [
    { area: "center", order: 50, groups: [ { id:"grp-planning",  commandIds:["planning.timescale"] } ] },
    { area: "right",  order: 10, groups: [ { id:"grp-estimates", commandIds:["estimates.vat"]     } ] }
  ]

  // --- Slik sender en app inn logo senere (eksempel – kommentert ut):
  // const headerRight = (
  //   <span className="menu-logo" aria-label="Morning Coffee Labs">
  //     <img src="/logo-mcl.svg" alt="" />
  //     Morning Coffee Labs
  //   </span>
  // )

  return (
    <>
      <ToolbarCore
        ctx={ctx}
        slots={slots}
        projectName="DemoProsjekt"
        status={ctx.online ? (ctx.dirty ? "autosave" : "saved") : "offline"}
        // headerRight={headerRight} // ← bruk dette i appene som ønsker logo
      />
      <div className="page">
        <h2>Project Ribbon – lys kaffe</h2>
        <p>Verktøylinja er klargjort for logo via <code>headerRight</code>, men legger ikke inn logo selv.</p>
        <div style={{display:"flex", gap:8, marginTop:12}}>
          <button onClick={()=>setCtx(c=>({...c, online: !c.online}))}>
            Toggle Online ({String(ctx.online)})
          </button>
          <button onClick={()=>setCtx(c=>({...c, dirty: !c.dirty}))}>
            Toggle Dirty ({String(ctx.dirty)})
          </button>
        </div>
      </div>
    </>
  )
}
