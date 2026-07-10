import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export const login = (req: any, res: any) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    const token = jwt.sign(
      { username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Credenciales incorrectas" });
};