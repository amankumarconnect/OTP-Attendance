import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as jwt.Secret;

export const authenticateToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Token not provided");
  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

export const generateToken = (userData: object) => {
  return jwt.sign(userData, secret, { expiresIn: "7d" });
};
