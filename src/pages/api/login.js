import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { password } = req.body;

  // check password against env
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Wrong password" });
  }

  // generate JWT token
  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({ token });
}
