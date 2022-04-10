import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createClient, Provider } from "urql";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";

const client = createClient({
  url: "http://localhost:4000/graphql",
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

