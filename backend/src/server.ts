import app from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() || 0 });
});
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Backend escuchando en http://0.0.0.0:${PORT}`);
});