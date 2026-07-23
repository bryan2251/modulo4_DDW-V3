import "dotenv/config";
import express from "express";
import cors from "cors";

import taskRoutes from "./routes/task.routes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// rutas
app.use("/tasks", taskRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});