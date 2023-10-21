import express from "express";
import { User } from "../models/user.js";
import jwt_decode from "jwt-decode";

const router = express.Router();

router.get("/:token", async (req, res) => {
  const token = req.params.token;
  const decoded = jwt_decode(token);

  const user = await User.findById(decoded.id);

  if (!user) res.send({ status: "error", error: "User not found" });

  res.send({ status: "ok", user: user });
});

export default router;
