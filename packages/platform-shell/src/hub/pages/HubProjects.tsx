// ==== [BLOCK: Imports] BEGIN ====
import React from "react";
import { ProjectList } from "../projects/ProjectList";
import { ProjectDetail } from "../projects/ProjectDetail";
import { getQueryParam } from "../nav";
// ==== [BLOCK: Imports] END ====

// ==== [BLOCK: Component] BEGIN ====
export function HubProjects() {
  const [, force] = React.useReducer(x => x + 1, 0);

  React.useEffect(() => {
    const onPop = () => force();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const pid = getQueryParam("pid"); // når satt → vis detalj
  return pid ? <ProjectDetail projectId={pid} /> : <ProjectList />;
}
// ==== [BLOCK: Component] END ====
