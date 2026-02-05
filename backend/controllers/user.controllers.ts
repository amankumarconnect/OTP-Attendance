import type { Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../middleware/auth";

export const signUp = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const newUser = new User(userData);
    await newUser.save();
    const token = generateToken({
      _id: newUser._id,
      role: newUser.role,
      name: newUser.name,
      email: newUser.email,
    });

    res.status(201).json({
      _id: newUser._id,
      role: newUser.role,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
