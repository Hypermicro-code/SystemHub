// import øverst
import { TopbarIndicator } from "../components/TopbarIndicator";

// … inni return-blokken der headeren ligger:
<header
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#17181B",
    borderBottom: "1px solid #2A2E34",
    height: 40,
    padding: "0 10px",
  }}
>
  <div style={{ fontWeight: 600 }}>Manage Plattform</div>
  <TopbarIndicator />
</header>
