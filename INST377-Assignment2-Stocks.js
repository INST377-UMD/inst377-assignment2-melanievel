function loadStocksAPI() {
  const stocksTable = document.getElementById("stocksTable");
  fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03")
    .then((result) => result.json())
    .then((resultJson) => {
      resultJson.slice(0, 5).forEach((stockObject) => {
        const tableRow = document.createElement("tr");
        const ticker = document.createElement("td");
        const commentCount = document.createElement("td");
        const sentiment = document.createElement("td");

        ticker.innerHTML = stockObject["ticker"];
        commentCount.innerHTML = stockObject["no_of_comments"];
        sentiment.innerHTML = stockObject["sentiment"];

        var bullImg = document.createElement("img");
        bullImg.src =
          "https://cdn2.iconfinder.com/data/icons/stock-investment-flat-gradient/64/25_bullish_uptrend_animal_stocks_finance_graph_investing_investment_finance_business-512.png";

        var bearImg = document.createElement("img");
        bearImg.src =
          "https://cdn.iconscout.com/icon/free/png-256/free-bearish-icon-download-in-svg-png-gif-file-formats--downtrend-animal-stocks-finance-investment-pack-business-icons-1570417.png";

        let link = document.createElement("a");
        const url = `https://finance.yahoo.com/quote/${ticker}/`;
        link.setAttribute("href", url);
        link.textContent = ticker.innerHTML;
        ticker.appendChild(link);

        if (sentiment.innerHTML == "Bullish") {
          sentiment.appendChild(bullImg);
        } else {
          sentiment.appendChild(bearImg);
        }

        tableRow.appendChild(ticker);
        tableRow.appendChild(commentCount);
        tableRow.appendChild(sentiment);

        stocksTable.append(tableRow);
      });
    });
}

async function getData() {
  const stocksTicker = document.getElementById("searchBar").value;
  const select = document.getElementById("selectDays");
  const multiplier = select.value;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const to = `${year}-${month}-${day}`;
  console.log(to);
  const priorDate = new Date(new Date().setDate(today.getDate() - 90));
  const priorYear = priorDate.getFullYear();
  const priorMonth = String(priorDate.getMonth() + 1).padStart(2, "0");
  const priorDay = String(priorDate.getDate()).padStart(2, "0");
  const from = `${priorYear}-${priorMonth}-${priorDay}`;
  console.log(from);

  const stockData = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/range/${multiplier}/day/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=ph5aRsCBw1P13Gx67t5Vp_lUoQL5e321`
  ).then((result) => result.json());

  console.log("Retrieved Data:", stockData);

  return stockData;
}

async function populateStocksChart(stock) {
  const stockData = await getData();
  stock = getData.stocksTicker;

  const dates = [];
  const prices = [];

  stockData["results"].forEach((stockObject) => {
    var timestamp = stockObject["t"];
    var date = new Date(timestamp * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var transormedDate = `${year}-${month}-${day}`;
    console.log(transormedDate);
    dates.push(transormedDate);
    prices.push(stockObject["vw"]);
  });

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Stock Price",
          data: prices,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

function loadPage(){
    loadStocksAPI();
    getData();

  // Audio library
  const onButton = document.getElementById("audioOn");
  onButton.addEventListener("click", function () {
    AudioCommands();
  });

  const offButton = document.getElementById("audioOff");
  offButton.addEventListener("click", function () {
    turnOffLibrary();
  });
  //

  populateStocksChart(getData.stocksTicker);

}

function AudioCommands() {
  if (annyang) {
    const commands = {
      hello: () => {
        alert("Hello world!");
      },
      "change the color to :color": function (color) {
        document.body.style.background = color;
      },
      "navigate to :page": function (page) {
        window.location.href = "INST377-Assignment2-" + page + ".html";
      },
      "Look up :stock": function (stock) {
        stock.toUpperCase();
        populateStocksChart(stock);
      },
    };

    annyang.addCommands(commands);

    annyang.start();
  }
}

function turnOffLibrary() {
  if (annyang) {
    annyang.abort();
  }
}

window.onload = loadPage;
