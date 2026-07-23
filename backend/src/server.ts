import app from "./app";
import "dotenv/config";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`I live, Backend running on http://localhost:${PORT}`);
});