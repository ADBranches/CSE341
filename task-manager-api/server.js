import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json" with { type: "json" };
import app from "./app.js";
import connectDB from "./db/conn.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 + centralized errors
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs on http://localhost:${PORT}/api-docs`);
  });
};

startServer();