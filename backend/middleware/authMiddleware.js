import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.cookies.myToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWt_SECERT);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Please login" });
  }
}
