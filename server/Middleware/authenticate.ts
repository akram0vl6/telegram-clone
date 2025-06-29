// middleware/authenticate.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: no token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    (req as any).userId = (payload as any)._id || (payload as any).id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default authenticate;
