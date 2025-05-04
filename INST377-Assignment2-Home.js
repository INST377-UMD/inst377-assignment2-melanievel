function loadPage() {
  pageButtons();
  loadQuotes();

  const onButton = document.getElementById("audioOn");
  onButton.addEventListener("click", function () {
    AudioCommands();
  });

  const offButton = document.getElementById("audioOff");
  offButton.addEventListener("click", function () {
    turnOffLibrary();
  });
}

function loadQuotes() {
  fetch("https://zenquotes.io/api/random")
    .then((result) => result.json())
    .then((resultJson) => {
      resultJson.forEach((quoteObject) => {
        const quote = quoteObject["q"];
        const author = quoteObject["a"];

        document.getElementById("quote").innerHTML =
          '"' + quote + '"' + " ~ " + author;
      });
    });
}

function pageButtons() {
  document.getElementById("stocks").onclick = function () {
    location.href = "INST377-Assignment2-Stocks.html";
  };

  document.getElementById("dogs").onclick = function () {
    location.href = "INST377-Assignment2-Dogs.html";
  };
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

window.onload = loadPage();
