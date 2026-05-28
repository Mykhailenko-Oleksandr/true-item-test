import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errors } from "celebrate";
import "dotenv/config";

import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import tasksRoutes from "./routes/tasksRoutes.js";

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.json({
    version: "1.0.0",
    message: "Welcome to the True-Item-Test backend!",
  });
});

app.use(tasksRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

export default app;
