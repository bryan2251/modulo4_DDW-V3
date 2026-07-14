import express from "express";
import cors from "cors";
import "dotenv/config";

import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

export default app;