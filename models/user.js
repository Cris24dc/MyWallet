import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  incomeValue: {
    type: Number,
    default: 0,
  },
  expenseValue: {
    type: Number,
    default: 0,
  },
  savedValue: {
    type: Number,
    default: 0,
  },
  transactions: {
    type: Array,
    default: [],
  },
  balancePerMonth: {
    type: Array,
    default: [
      {
        month: "January",
        value: 0,
      },
      {
        month: "February",
        value: 0,
      },
      {
        month: "March",
        value: 0,
      },
      {
        month: "April",
        value: 0,
      },
      {
        month: "May",
        value: 0,
      },
      {
        month: "June",
        value: 0,
      },
      {
        month: "July",
        value: 0,
      },
      {
        month: "August",
        value: 0,
      },
      {
        month: "September",
        value: 0,
      },
      {
        month: "October",
        value: 0,
      },
      {
        month: "November",
        value: 0,
      },
      {
        month: "December",
        value: 0,
      },
    ],
  },
  incomeCategories: {
    type: Array,
    default: [
      {
        name: "Salary",
        value: 0,
        color: "#83EA78",
        image: "../images/salary.png",
      },
      {
        name: "Dividend",
        value: 0,
        color: "#7899EA",
        image: "../images/dividend.png",
      },
      {
        name: "Business",
        value: 0,
        color: "#DA78EA",
        image: "../images/business.png",
      },
      {
        name: "Rental",
        value: 0,
        color: "#EABB78",
        image: "../images/rental.png",
      },
      {
        name: "Other",
        value: 0,
        color: "#EA7878",
        image: "../images/other.png",
      },
    ],
  },
  outcomeCategories: {
    type: Array,
    default: [
      {
        name: "Food",
        value: 0,
        color: "#95D8AF",
        image: "../images/food.png",
      },
      {
        name: "Transport",
        value: 0,
        color: "#E9C6FF",
        image: "../images/transport.png",
      },
      {
        name: "Utility",
        value: 0,
        color: "#FFEDAB",
        image: "../images/utility.png",
      },
      {
        name: "Medication",
        value: 0,
        color: "#D4F986",
        image: "../images/medication.png",
      },
      {
        name: "Travel",
        value: 0,
        color: "#78E9EA",
        image: "../images/travel.png",
      },
      {
        name: "Clothes",
        value: 0,
        color: "#B3FFE4",
        image: "../images/clothes.png",
      },
      {
        name: "Insurance",
        value: 0,
        color: "#EA78BE",
        image: "../images/insurance.png",
      },
      {
        name: "Education",
        value: 0,
        color: "#7888EA",
        image: "../images/education.png",
      },
      {
        name: "Other",
        value: 0,
        color: "#EA7878",
        image: "../images/other.png",
      },
    ],
  },
  savingItems: {
    type: Array,
    default: [],
  },
  currency: {
    type: String,
    default: "$",
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object().keys({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export { User, validateUser };
