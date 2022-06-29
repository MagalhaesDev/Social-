import React from "react";
import ReactDOM from "react-dom/client";
import { createServer, Model } from "miragejs";

import { App } from "./App";

import "./global.css";

createServer({
  models: {
    user: Model,
  },

  seeds(server) {
    server.db.loadData({
      users: [
        {
          id: 1,
          username: "Mateus Magalhaes",
          email: "mateusmagalhaesemidio@gmail.com",
          password: "123",
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";
    this.get("users", () => {
      return this.schema.all("user");
    });

    this.post("users", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("user", data);
    });
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
