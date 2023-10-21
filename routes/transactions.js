// Import necessary modules and functions
import express from "express";
import { User, validateUser } from "../models/user.js";
import jwt_decode from "jwt-decode";

// Create an Express Router
const router = express.Router();

// Define the route using async/await
router.post("/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt_decode(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.send({ status: "error", error: "User not found" });
    }

    const transaction = {
      type: req.body.type,
      category: req.body.category,
      description: req.body.description,
      amount: req.body.amount,
      date: req.body.date,
    };

    if (transaction.type === "expense") {
      user.balance = user.balance - transaction.amount;
      const monthIndex =
        parseInt(`${transaction.date[5]}${transaction.date[6]}`) - 1;
      user.expenseValue = user.expenseValue + transaction.amount;

      const category = user.outcomeCategories.find(
        (cat) => cat.name === transaction.category
      );
      const indexOfCategory = user.outcomeCategories.indexOf(category);
      const newValue =
        user.outcomeCategories[indexOfCategory].value + transaction.amount;

      user.outcomeCategories[indexOfCategory] = {
        name: transaction.category,
        value: newValue,
        color: user.outcomeCategories[indexOfCategory].color,
        image: user.outcomeCategories[indexOfCategory].image,
      };

      user.balancePerMonth[monthIndex] = {
        month: user.balancePerMonth[monthIndex].month,
        value: user.balance,
      };

      user.transactions.unshift(transaction);
    } else if (transaction.type === "income") {
      const category = user.incomeCategories.find(
        (cat) => cat.name === transaction.category
      );
      const indexOfCategory = user.incomeCategories.indexOf(category);
      const newValue =
        user.incomeCategories[indexOfCategory].value + transaction.amount;
      let demoValue = 0;

      user.incomeCategories[indexOfCategory] = {
        name: transaction.category,
        value: newValue,
        color: user.incomeCategories[indexOfCategory].color,
        image: user.incomeCategories[indexOfCategory].image,
      };

      user.incomeValue = user.incomeValue + transaction.amount;

      if (user.savingItems.length > 0) {
        user.savingItems.forEach((item) => {
          const savedAmount = transaction.amount * (item.percentage / 100);
          const indexOfItem = user.savingItems.indexOf(item);
          demoValue = transaction.amount - savedAmount;
          const saved = user.savingItems[indexOfItem].savedValue + savedAmount;

          user.savedValue = savedAmount + user.savedValue;

          user.savingItems[indexOfItem] = {
            name: item.name,
            value: item.value,
            savedValue: saved,
            percentage: item.percentage,
            color: item.color,
            image: item.image,
          };

          if (
            user.savingItems[indexOfItem].savedValue >=
            user.savingItems[indexOfItem].value
          ) {
            user.savingItems.splice(indexOfItem, 1);
          }
        });
      }

      const monthIndex =
        parseInt(`${transaction.date[5]}${transaction.date[6]}`) - 1;

      if (demoValue === 0) {
        user.balance = user.balance + transaction.amount;
      } else if (demoValue > 0) {
        user.balance = user.balance + demoValue;
      }

      user.balancePerMonth[monthIndex] = {
        month: user.balancePerMonth[monthIndex].month,
        value: user.balance,
      };

      user.transactions.unshift(transaction);
    }

    // Save the user
    await user.save();

    res.send({ status: "ok" });
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
});

// Export the router
export default router;
