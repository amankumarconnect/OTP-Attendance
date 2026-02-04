import type { Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../middleware/auth";

// create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    await newUser.save();
    const token = generateToken({
      id: newUser._id,
      role: newUser.role,
      name: newUser.name,
      email: newUser.email,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
