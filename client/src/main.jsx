import React from "react";
import {createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import App from "./App";
import './index.css';

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <ThirdwebProvider activeChain={Sepolia}>
    <Router>
      <App />
    </Router>
  </ThirdwebProvider>
);
