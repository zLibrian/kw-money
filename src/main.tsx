import { createServer } from "miragejs";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TransactionProvider } from "./context/TransactionContext";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title:
            "Someday ill be falling without caution but for now im onlyyyyy... people watching",
        },
      ];
    });
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TransactionProvider>
    <App />
    </TransactionProvider>
  </React.StrictMode>
);
