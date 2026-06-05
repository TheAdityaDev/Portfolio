import React, { useEffect } from "react";
import App from "./App";
import { healthAPI } from "services/api";

function Root() {
  useEffect(()=>{
    healthAPI.healthCheck()
  },[healthAPI])

  return <App />;
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Root />);