import express from "express";
import { User, validateUser } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "kdhas9opydu91q123j124bmsadajhgjbaseuywgw4";

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.json({ status: "error", error: error.message });

  const { firstName, lastName, email, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);

  if (!firstName || !lastName || !email || !plainTextPassword)
    return res.json({ status: "error", error: "All fields must be provided" });

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    console.log("user created successfully", user);
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    res.json({ status: "ok", data: token });
  } catch (err) {
    if (err.code === 11000)
      return res.json({
        status: "error",
        error: "User with the email registered already exists",
      });
    return res.json({ status: "error", error: err.message });
  }
});

export default router;
