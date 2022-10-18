import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { initFirebase } from "./services/product.service";

initFirebase();
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
