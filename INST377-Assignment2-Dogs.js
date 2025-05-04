function getDogImages() {
  const images = document.getElementById("myslider");
  fetch("https://dog.ceo/api/breeds/image/random/10")
    .then((result) => result.json())
    .then((data) => {
      const imgSrc = data.message;
      imgSrc.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.width = 490;
        img.height = 490;
        images.appendChild(img);
      });
      simpleslider.getSlider();
      createBreedButtons();

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
    });
}

function createBreedButtons() {
  const buttons = document.getElementById("dogButtons");

  fetch("https://dogapi.dog/api/v2/breeds")
    .then((result) => result.json())
    .then((resultJson) => {
      const resultArray = resultJson.data;
      resultArray.forEach((breed) => {
        const button = document.createElement("button");
        button.textContent = breed["attributes"]["name"];

        button.addEventListener("click", function () {
          breedInfo(
            breed["attributes"]["name"],
            breed["attributes"]["description"],
            breed["attributes"]["life"]["min"],
            breed["attributes"]["life"]["max"]
          );
        });
        buttons.appendChild(button);
      });
    });
}

function breedInfo(name, description, min, max) {
  let paragraph = document.getElementById("container");
  paragraph.innerHTML = "";

  let dogName = document.createElement("h1");
  dogName.textContent = "Name: " + name;
  paragraph.appendChild(dogName);

  let desc = document.createElement("h3");
  desc.textContent = "Description: " + description;
  paragraph.appendChild(desc);

  let minimum = document.createElement("h3");
  minimum.textContent = "Min life: " + min;
  paragraph.appendChild(minimum);

  let maximum = document.createElement("h3");
  maximum.textContent = "Max life: " + max;
  paragraph.appendChild(maximum);
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
      "Load Dog Breed :DogBreedName": function (DogBreedName) {
        const div = document.getElementById("container");
        div.style.display = "block";
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

window.onload = getDogImages;
