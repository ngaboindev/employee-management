const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const docs = require("./openapi.json");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDatabase = require("./config/db");

const routes = require("./routes");

dotenv.config();
connectDatabase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/documentation/v1/", swaggerUI.serve, swaggerUI.setup(docs));
app.use("/api/v1", routes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
