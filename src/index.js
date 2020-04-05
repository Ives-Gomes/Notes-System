import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./styles/index.css";
import { Container } from "./styles/index";

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);
