import React, { useEffect } from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css"; 
import "./styles/index.css";
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