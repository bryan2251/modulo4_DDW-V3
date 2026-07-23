import "dotenv/config";
import express from "express";
import cors from "cors";

import taskRoutes from "./routes/task.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// rutas
app.use("/tasks", taskRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Backend escuchando en http://0.0.0.0:${PORT}`);
});