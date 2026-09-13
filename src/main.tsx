import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/space-grotesk/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./styles/layers.css";
/* OpenUI 组件样式只需从这一处引入（开启 @layer openui 的分层变体） */
import "@openuidev/react-ui/layered/styles/index.css";
import "./styles/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const host = document.getElementById("root");
if (!host) throw new Error("#root not found");

createRoot(host).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
