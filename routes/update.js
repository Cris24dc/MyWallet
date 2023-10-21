import express from "express";
import { User, validateUser } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const app = express();
const router = express.Router();

const JWT_SECRET = "kdhas9opydu91q123j124bmsadajhgjbaseuywgw4";

router.post("/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt_decode(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.json({ status: "error", error: "User not found" });
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }

    if (password && password.length < 5) {
      return res.json({
        status: "error",
        error: "Password must be at least 5 characters long",
      });
    }
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const newToken = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);

    await user.save();
    res.json({ status: "ok" });
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
});

export default router;
