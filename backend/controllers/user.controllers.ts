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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await (existingUser as any).comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({
      _id: existingUser._id,
      role: existingUser.role,
      name: existingUser.name,
      email: existingUser.email,
    });

    res.status(200).json({
      _id: existingUser._id,
      role: existingUser.role,
      name: existingUser.name,
      email: existingUser.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
