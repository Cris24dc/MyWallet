import express from "express";
import { User, validateUser } from "../models/user.js";
import jwt_decode from "jwt-decode";

const router = express.Router();

router.get("/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt_decode(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.send({ status: "error", error: "User not found" });

    if (user.currency === "$") {
      return res.json({ status: "ok", currency: "USD" });
    }
    if (user.currency === "£") {
      return res.json({ status: "ok", currency: "GBP" });
    }
    if (user.currency === "€") {
      return res.json({ status: "ok", currency: "EUR" });
    }
    if (user.currency === "LEI") {
      return res.json({ status: "ok", currency: "RON" });
    }
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
});

router.post("/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt_decode(token);
    const user = await User.findById(decoded.id);
    if (!user) return res.json({ status: "error", error: "User not found" });

    const currency = req.body.currency;

    if (currency === "USD") {
      user.currency = "$";
      await user.save();
      return res.json({ status: "ok" });
    }
    if (currency === "EUR") {
      user.currency = "€";
      await user.save();
      return res.json({ status: "ok" });
    }
    if (currency === "GBP") {
      user.currency = "£";
      await user.save();
      return res.json({ status: "ok" });
    }
    if (currency === "RON") {
      user.currency = "LEI";
      await user.save();
      return res.json({ status: "ok" });
    }
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
});

export default router;
