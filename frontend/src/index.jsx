import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import { healthAPI } from "services/api";

const container = document.getElementById("root");
const root = createRoot(container);

useEffect(()=>{
    healthAPI.healthCheck()
},[healthAPI])

root.render(<App />);