import app from "./app";
import "dotenv/config";

const PORT = 3000;
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() || 0 });
});
app.listen(PORT, () => {
  console.log(`I live, Backend running on http://localhost:${PORT}`);
});