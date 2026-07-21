import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import YAML from "yaml";
import { apiReference } from "@scalar/express-api-reference";

import sequelize from "./src/config/database.js";
import platsRoutes from "./src/routes/plats.routes.js";
import errorHandler from "./src/middlewares/errorHandler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Snack Bar API is running " });
});

app.use("/api/plats", platsRoutes);

const openapiPath = join(__dirname, "src", "docs", "openapi.yaml");
const openapiSpec = YAML.parse(readFileSync(openapiPath, "utf8"));

app.use(
  "/docs",
  apiReference({
    spec: { content: openapiSpec },
  })
);

app.use(errorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync();
    console.log("Database synchronized.");

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start the server.");
    console.error(err);
    process.exit(1);
  }
}

start();