const token = localStorage.getItem("token");
const sumTxt = document.querySelector(".sum-txt");
const curTxt = document.querySelector(".sum-cur");
const incomeBtn = document.querySelector(".incomes-button");
const expenseBtn = document.querySelector(".expenses-button");

const darkMode = localStorage.getItem("darkMode");

if (darkMode === "enabled") {
  const homeImg = document.querySelector(".home-img");
  const savingImg = document.querySelector(".savings-img");
  const historyImg = document.querySelector(".history-img");
  const logoImg = document.querySelector(".logo-img");
  document.body.classList.add("darkMode");
  homeImg.src = "../images/homewhite.png";
  savingImg.src = "../images/savingswhite.png";
  historyImg.src = "../images/historywhite.png";
  logoImg.src = "../images/logowhite.png";
}

let walletCategoryChart;
let currency;

let dataExpense = [];
let labelExpense = [];
let colorExpense = [];
let imageExpense = [];

let dataIncome = [];
let labelIncome = [];
let colorIncome = [];
let imageIncome = [];

let imageForChart = [];

getUser();

expenseBtn.addEventListener("click", expenseBtnHandler);
incomeBtn.addEventListener("click", incomeBtnHandler);

async function getUser() {
  const { user } = await fetch(`/api/user/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err.message));

  currency = user.currency;

  changeBalance(user.balance);
  createDataForChart(user.incomeCategories, user.outcomeCategories);
  generateChart();
}

function changeBalance(balance) {
  sumTxt.innerHTML = balance;
  curTxt.innerHTML = currency;
}

function createDataForChart(categoriesIncome, categoriesOutcome) {
  // ... Your existing code ...

  for (let i = 0; i < 5; i++) {
    dataIncome[i] = categoriesIncome[i].value;
    labelIncome[i] = categoriesIncome[i].name;
    colorIncome[i] = categoriesIncome[i].color;
    // Update the image path to point directly to the root of the images directory
    imageIncome[i] = "../images/" + categoriesIncome[i].image + ".png";
  }

  for (let i = 0; i < 9; i++) {
    dataExpense[i] = categoriesOutcome[i].value;
    labelExpense[i] = categoriesOutcome[i].name;
    colorExpense[i] = categoriesOutcome[i].color;
    // Update the image path to point directly to the root of the images directory
    imageExpense[i] = "../images/" + categoriesOutcome[i].image + ".png";
  }

  imageForChart = imageIncome;
}

function generateChart() {
  const data = {
    labels: labelIncome,
    datasets: [
      {
        label: "Label",
        data: dataIncome,
        backgroundColor: colorIncome,
        borderColor: colorIncome,
        borderWidth: 1,
        cutout: "80%",
      },
    ],
  };

  const counterWallet = {
    id: "counter",
    afterDatasetsDraw(chart, args, options) {
      const {
        ctx,
        data,
        chartArea: { top, bottom, right, left, width, height },
      } = chart;
      ctx.save();
      ctx.font = 40 + "px " + options.fontFamily;
      ctx.textAlign = "center";
      if (darkMode === "enabled") ctx.fillStyle = "white";
      else ctx.fillStyle = "black";

      ctx.fillText(
        currency + data.datasets[0].data[0],
        width / 2,
        top + height / 2 + options.fontSize * 0.34 - 25
      );
      ctx.restore();

      ctx.font = options.fontSize + "px " + options.fontFamily;
      ctx.textAlign = "center";
      ctx.fillStyle = "gray";
      ctx.fillText(
        data.labels[0],
        width / 2,
        top + height / 2 + 30 * 0.34 + 32.5
      );
    },
  };

  const configWallet = {
    type: "doughnut",
    data: data,
    options: {
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        counter: {
          fontColor: "black",
          fontSize: 50,
          fontFamily: "sans-serif",
        },
      },
    },
    plugins: [counterWallet],
  };

  walletCategoryChart = new Chart(
    document.getElementById("chart"),
    configWallet
  );

  generateLegend();
}

function generateLegend() {
  const catsCon = document.querySelector(".cats-con");
  catsCon.innerHTML = "";
  const catTxt = document.createElement("p");
  catTxt.innerHTML = "Categories";
  catTxt.setAttribute("class", "cat-txt");
  catsCon.appendChild(catTxt);

  walletCategoryChart.legend.legendItems.forEach((dataset, index) => {
    const catCon = document.createElement("div");
    catCon.setAttribute("class", "cat-con");

    const leftCon = document.createElement("div");
    leftCon.setAttribute("class", "left-con-side");

    const catClrCon = document.createElement("div");
    catClrCon.setAttribute("class", `cat-clr-con ${dataset.text}-con`);
    const img = document.createElement("img");
    // Update the image path to ../images/name.png
    img.src = imageForChart[index];
    catClrCon.appendChild(img);

    const catName = document.createElement("p");
    catName.setAttribute("class", "cat-name");
    catName.innerHTML = dataset.text;

    leftCon.appendChild(catClrCon);
    leftCon.appendChild(catName);

    const rightCon = document.createElement("div");
    rightCon.setAttribute("class", "right-con-side");

    const price = document.createElement("p");
    price.setAttribute("class", "price");
    price.innerHTML = walletCategoryChart.data.datasets[0].data[index];

    const curr = document.createElement("p");
    curr.setAttribute("class", "cur");
    curr.innerHTML = currency;

    rightCon.appendChild(price);
    rightCon.appendChild(curr);

    catCon.appendChild(leftCon);
    catCon.appendChild(rightCon);

    catsCon.appendChild(catCon);
  });
}

function expenseBtnHandler() {
  expenseBtn.classList.add("selected");
  incomeBtn.classList.remove("selected");

  walletCategoryChart.data.datasets[0].data = dataExpense;
  walletCategoryChart.data.labels = labelExpense;
  walletCategoryChart.data.datasets[0].backgroundColor = colorExpense;
  walletCategoryChart.data.datasets[0].borderColor = colorExpense;
  imageForChart = imageExpense;

  walletCategoryChart.update();
  generateLegend();
}

function incomeBtnHandler() {
  expenseBtn.classList.remove("selected");
  incomeBtn.classList.add("selected");

  walletCategoryChart.data.datasets[0].data = dataIncome;
  walletCategoryChart.data.labels = labelIncome;
  walletCategoryChart.data.datasets[0].backgroundColor = colorIncome;
  walletCategoryChart.data.datasets[0].borderColor = colorIncome;
  imageForChart = imageIncome;

  walletCategoryChart.update();
  generateLegend();
}
