import app from "./app";
import "dotenv/config";

const PORT = 3000;
const apiKey = 'sk_test_FALSO123456789'  // TODO: mover a variable de entorno

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});