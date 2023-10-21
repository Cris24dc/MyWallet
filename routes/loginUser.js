import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

const router = express.Router();
const JWT_SECRET = "kdhas9opydu91q123j124bmsadajhgjbaseuywgw4";

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.json({ status: "error", error: error.message });

  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user)
    return res.json({ status: "error", error: "Invalid email or password" });

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid email or password" });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

export default router;
