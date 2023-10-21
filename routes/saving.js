import express from "express";
import { User, validateUser } from "../models/user.js";
import jwt_decode from "jwt-decode";

const router = express.Router();

router.post("/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt_decode(token);
    const user = await User.findById(decoded.id);

    if (!user) return res.send({ status: "error", error: "User not found" });

    const saving = {
      name: req.body.name,
      value: req.body.value,
      savedValue: req.body.savedValue,
      percentage: req.body.percentage,
      color: req.body.color,
      image: req.body.image,
    };

    user.savingItems.unshift(saving);
    await user.save();

    return res.json({ status: "ok" });
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
});

router.delete("/:token/:index", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt_decode(token);
    const user = await User.findById(decoded.id);
    const index = req.params.index;

    if (!user) return res.json({ status: "error", error: "User not found" });

    user.balance = user.balance + user.savingItems[index].savedValue;
    user.savedValue = user.savedValue - user.savingItems[index].savedValue;
    user.savingItems.splice(index, 1);

    await user.save();
    res.json({ status: "ok" });
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
});

export default router;
