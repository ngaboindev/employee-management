const express = require("express");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDatabase = require("./config/db");

const routes = require("./routes");

dotenv.config();
connectDatabase();

const app = express();

app.use(express.json());

app.get("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
app.use("/api/v1", routes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
