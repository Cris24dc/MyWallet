const nextOne = document.getElementById("next-one");
const nextTwo = document.getElementById("next-two");
const backTwo = document.getElementById("back-two");
const backThree = document.getElementById("back-three");
const doneBtn = document.getElementById("done");
const transactionOne = document.querySelector(".transaction-one");
const transactionTwo = document.querySelector(".transaction-two");
const transactionThree = document.querySelector(".transaction-three");
const incomeRadio = document.getElementById("income-label");
const expenseRadio = document.getElementById("expense-label");
const savingRadio = document.getElementById("saving-label");
const token = localStorage.getItem("token");
const imgIncome = document.querySelector("#income-label img");
const imgExpense = document.querySelector("#expense-label img");
const imgSaving = document.querySelector("#saving-label img");

const darkMode = localStorage.getItem("darkMode");

if (darkMode === "enabled") {
  const homeImg = document.querySelector(".home-img");
  const walletImg = document.querySelector(".wallet-img");
  const savingImg = document.querySelector(".savings-img");
  const historyImg = document.querySelector(".history-img");
  const nextImgs = document.querySelectorAll(".next");
  const backImgs = document.querySelectorAll(".back");
  const logoImg = document.querySelector(".logo-img");
  document.body.classList.add("darkMode");
  homeImg.src = "../images/homewhite.png";
  walletImg.src = "../images/walletwhite.png";
  savingImg.src = "../images/savingswhite.png";
  historyImg.src = "../images/historywhite.png";
  imgIncome.src = "../images/pluswhite.png";
  imgExpense.src = "../images/pluswhite.png";
  imgSaving.src = "../images/pluswhite.png";
  nextImgs.forEach((img) => (img.src = "../images/arrow-rightwhite.png"));
  backImgs.forEach((img) => (img.src = "../images/arrow-leftwhite.png"));
  logoImg.src = "../images/logowhite.png";
}

const expenseCategory = [
  {
    name: "Food",
    value: 0,
    color: "#95D8AF",
    image: "../images/food.png",
    class: "food",
  },
  {
    name: "Transport",
    value: 0,
    color: "#E9C6FF",
    image: "../images/transport.png",
    class: "transport",
  },
  {
    name: "Utility",
    value: 0,
    color: "#FFEDAB",
    image: "../images/utility.png",
    class: "utility",
  },
  {
    name: "Medication",
    value: 0,
    color: "#D4F986",
    image: "../images/medication.png",
    class: "medication",
  },
  {
    name: "Travel",
    value: 0,
    color: "#92E5FF",
    image: "../images/travel.png",
    class: "travel",
  },
  {
    name: "Clothes",
    value: 0,
    color: "#B3FFE4",
    image: "../images/clothes.png",
    class: "clothes",
  },
  {
    name: "Insurance",
    value: 0,
    color: "#EA78BE",
    image: "../images/insurance.png",
    class: "insurance",
  },
  {
    name: "Education",
    value: 0,
    color: "#7888EA",
    image: "../images/education.png",
    class: "education",
  },
  {
    name: "Other",
    value: 0,
    color: "#EA7878",
    image: "../images/other.png",
    class: "other-expense",
  },
];

const incomeCategory = [
  {
    name: "Salary",
    value: 0,
    color: "#95D8AF",
    image: "../images/salary.png",
    class: "salary",
  },
  {
    name: "Dividend",
    value: 0,
    color: "#95D8AF",
    image: "../images/dividend.png",
    class: "dividend",
  },
  {
    name: "Business",
    value: 0,
    color: "#95D8AF",
    image: "../images/business.png",
    class: "business",
  },
  {
    name: "Rental",
    value: 0,
    color: "#95D8AF",
    image: "../images/rental.png",
    class: "rental",
  },
  {
    name: "Other",
    value: 0,
    color: "#95D8AF",
    image: "../images/other.png",
    class: "other-income",
  },
];

const savingsCategory = [
  {
    name: "Car",
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: "#EA7878",
    image: "../images/savings/car.png",
    class: "car",
  },
  {
    name: "Debt",
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: "#EA7878",
    image: "../images/savings/debt.png",
    class: "debt",
  },
  {
    name: "Emergency",
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: "#EA7878",
    image: "../images/savings/emergency.png",
    class: "emergency",
  },
  {
    name: "Gadgets",
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: "#EA7878",
    image: "../images/savings/gadgets.png",
    class: "gadgets",
  },
  {
    name: "House",
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: "#EA7878",
    image: "../images/savings/house.png",
    class: "house",
  },
  {
    name: "Retirement",
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: "#EA7878",
    image: "../images/savings/retirement.png",
    class: "retirement",
  },
  {
    name: "Vacation",
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: "#EA7878",
    image: "../images/savings/vacation.png",
    class: "vacation",
  },
  {
    name: "Other",
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: "#EA7878",
    image: "../images/savings/other.png",
    class: "other-saving",
  },
];

const transaction = {
  type: "",
  category: "",
  description: "",
  amount: 0,
  date: "",
  color: "",
  image: "",
};

const saving = {
  name: "",
  value: 0,
  savedValue: 0,
  percentage: 0,
  color: "",
  image: "",
};

nextOne.addEventListener("click", nextOneClickHandler);
backTwo.addEventListener("click", backTwoClickHandler);
nextTwo.addEventListener("click", nextTwoClickHandler);
backThree.addEventListener("click", backThreeClickHandler);
doneBtn.addEventListener("click", doneClickHandler);
incomeRadio.addEventListener("click", incomeRadioClickHandler);
expenseRadio.addEventListener("click", expenseRadioClickHandler);
savingRadio.addEventListener("click", savingRadioClickHandler);

function nextOneClickHandler(e) {
  const checkOption = document.querySelector('input[name="option"]:checked');

  if (!checkOption) return alert("Please select an option");

  if (checkOption.value === "expense") {
    const form = document.getElementById("category-form");
    form.innerHTML = "";

    expenseCategory.forEach((cat) => {
      const input = document.createElement("input");
      input.setAttribute("class", `selection-ts2 ${cat.class}`);
      input.setAttribute("type", "radio");
      input.setAttribute("id", cat.class);
      input.setAttribute("name", "category");
      input.setAttribute("value", cat.name);
      input.dataset.cat = "expense";

      const label = document.createElement("label");
      label.setAttribute("class", `show-ts2 ${cat.class}`);
      label.setAttribute("for", cat.class);

      const img = document.createElement("img");
      img.src = cat.image;

      label.appendChild(img);
      form.appendChild(input);
      form.appendChild(label);
    });
    transaction.type = "expense";
  } else if (checkOption.value === "income") {
    const form = document.getElementById("category-form");
    form.innerHTML = "";

    incomeCategory.forEach((cat) => {
      const input = document.createElement("input");
      input.setAttribute("class", "selection-ts2");
      input.setAttribute("type", "radio");
      input.setAttribute("id", cat.class);
      input.setAttribute("name", "category");
      input.setAttribute("value", cat.name);
      input.dataset.cat = "income";

      const label = document.createElement("label");
      label.setAttribute("class", `show-ts2 ${cat.class}`);
      label.setAttribute("for", cat.class);

      const img = document.createElement("img");
      img.src = cat.image;

      label.appendChild(img);
      form.appendChild(input);
      form.appendChild(label);
    });
    transaction.type = "income";
  } else if (checkOption.value === "saving") {
    const form = document.getElementById("category-form");
    form.innerHTML = "";

    savingsCategory.forEach((cat) => {
      const input = document.createElement("input");
      input.setAttribute("class", `selection-ts2 ${cat.class}`);
      input.setAttribute("type", "radio");
      input.setAttribute("id", cat.class);
      input.setAttribute("name", "saving");
      input.setAttribute("value", cat.name);

      const label = document.createElement("label");
      label.setAttribute("class", `show-ts2 ${cat.class}`);
      label.setAttribute("for", cat.class);

      const img = document.createElement("img");
      img.src = cat.image;

      label.appendChild(img);
      form.appendChild(input);
      form.appendChild(label);
    });
  }

  transactionOne.setAttribute("id", "dnone");
  transactionTwo.removeAttribute("id");
}

function backTwoClickHandler(e) {
  transactionOne.removeAttribute("id");
  transactionTwo.setAttribute("id", "dnone");
}

function nextTwoClickHandler(e) {
  const tsContainer = document.getElementById("ts3-container");
  const checkOption = document.querySelector("input.selection-ts2:checked");
  if (!checkOption) return alert("Please select an option");

  if (checkOption.name === "category") {
    tsContainer.removeAttribute("data-cat"); // Remove the data-cat attribute
    tsContainer.setAttribute("data-cat", "transaction"); // Set it again
    transaction.category = checkOption.value;
    tsContainer.innerHTML = "";

    const formDate = document.createElement("form");
    formDate.setAttribute("class", "datecon");
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "date");
    dateLabel.innerHTML = "Date";
    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "date");
    dateInput.setAttribute("name", "date");
    formDate.appendChild(dateLabel);
    formDate.appendChild(dateInput);

    const formDesc = document.createElement("form");
    formDesc.setAttribute("class", "descon");
    const descLabel = document.createElement("label");
    descLabel.setAttribute("for", "description");
    descLabel.innerHTML = "Description";
    const descInput = document.createElement("input");
    descInput.setAttribute("type", "text");
    descInput.setAttribute("id", "description");
    descInput.setAttribute("name", "description");
    formDesc.appendChild(descLabel);
    formDesc.appendChild(descInput);

    const formAmount = document.createElement("form");
    formAmount.setAttribute("class", "amcon");
    const amountLabel = document.createElement("label");
    amountLabel.setAttribute("for", "amount");
    amountLabel.innerHTML = "Amount";
    const amountInput = document.createElement("input");
    amountInput.setAttribute("type", "number");
    amountInput.setAttribute("id", "amount");
    amountInput.setAttribute("name", "amount");
    formAmount.appendChild(amountLabel);
    formAmount.appendChild(amountInput);

    tsContainer.appendChild(formDate);
    tsContainer.appendChild(formDesc);
    tsContainer.appendChild(formAmount);
  } else if (checkOption.name === "saving") {
    tsContainer.removeAttribute("data-cat"); // Remove the data-cat attribute
    tsContainer.setAttribute("data-cat", "saving"); // Set it again
    tsContainer.innerHTML = "";

    const selectedCat = savingsCategory.find(
      (cat) => cat.name === checkOption.value
    );
    saving.name = selectedCat.name;
    saving.color = selectedCat.color;
    saving.image = selectedCat.image;

    const formVal = document.createElement("form");
    formVal.setAttribute("class", "valcon");
    const valLabel = document.createElement("label");
    valLabel.setAttribute("for", "value");
    valLabel.innerHTML = "Amount to save";
    const valInput = document.createElement("input");
    valInput.setAttribute("type", "number");
    valInput.setAttribute("id", "value");
    valInput.setAttribute("name", "value");
    formVal.appendChild(valLabel);
    formVal.appendChild(valInput);

    const formPercentage = document.createElement("form");
    formPercentage.setAttribute("class", "percentagecon");
    const percentageLabel = document.createElement("label");
    percentageLabel.setAttribute("for", "percentage");
    percentageLabel.innerHTML = "Percentage";
    const percentageInput = document.createElement("input");
    percentageInput.setAttribute("type", "number");
    percentageInput.setAttribute("id", "percentage");
    percentageInput.setAttribute("name", "percentage");
    formPercentage.appendChild(percentageLabel);
    formPercentage.appendChild(percentageInput);

    tsContainer.appendChild(formVal);
    tsContainer.appendChild(formPercentage);
  }

  transactionThree.removeAttribute("id");
  transactionTwo.setAttribute("id", "dnone");
}

function backThreeClickHandler(e) {
  transactionTwo.removeAttribute("id");
  transactionThree.setAttribute("id", "dnone");
}

async function doneClickHandler(e) {
  const tsContainer = document.getElementById("ts3-container");

  if (tsContainer.dataset.cat === "transaction") {
    const dateInput = document.getElementById("date");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");

    if (!dateInput.value || !descriptionInput.value || !amountInput.value)
      return alert("All fields are required");

    transaction.amount = amountInput.value;
    transaction.date = dateInput.value;
    transaction.description = descriptionInput.value;
    console.log(transaction);

    const result = await fetch(`/api/transaction/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: transaction.type,
        category: transaction.category,
        description: transaction.description,
        amount: parseInt(transaction.amount),
        date: transaction.date,
      }),
    })
      .then((res) => res.json())
      .catch((err) => alert(err.message));

    if (result.status === "ok") {
      location.replace("home.html");
    } else {
      alert(result.error);
    }
  } else if (tsContainer.dataset.cat === "saving") {
    const valInput = document.getElementById("value");
    const percentageInput = document.getElementById("percentage");

    if (!valInput.value || !percentageInput.value)
      return alert("All fields are required");

    saving.value = parseInt(valInput.value);
    saving.percentage = parseInt(percentageInput.value);

    console.log(saving);

    const result = await fetch(`/api/saving/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: saving.name,
        value: saving.value,
        savedValue: 0,
        percentage: saving.percentage,
        color: saving.color,
        image: saving.image,
      }),
    })
      .then((res) => res.json())
      .catch((err) => alert(err.message));

    if (result.status === "ok") {
      location.replace("home.html");
    } else {
      alert(result.error);
    }
  }
}

function incomeRadioClickHandler(e) {
  if (darkMode !== "enabled") {
    imgIncome.src = "../images/pluswhite.png";
    imgExpense.src = "../images/plus.png";
    imgSaving.src = "../images/plus.png";
  }
}

function expenseRadioClickHandler(e) {
  if (darkMode !== "enabled") {
    imgIncome.src = "../images/plus.png";
    imgExpense.src = "../images/pluswhite.png";
    imgSaving.src = "../images/plus.png";
  }
}

function savingRadioClickHandler(e) {
  if (darkMode !== "enabled") {
    imgIncome.src = "../images/plus.png";
    imgExpense.src = "../images/plus.png";
    imgSaving.src = "../images/pluswhite.png";
  }
}
