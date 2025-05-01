function getDogImages(){
    const images = document.getElementById('myslider');
    fetch("https://dog.ceo/api/breeds/image/random/10")
    .then(result => result.json())
    .then(data => {
        const imgSrc = data.message;
        imgSrc.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            images.appendChild(img);
        });
    });
}

function loadSlider(){
    getDogImages();
    createBreedButtons();
    AudioCommands();

    var imgSlider = simpleslider.getSlider({
      container: document.getElementById('myslider'),
      prop: 'left',
      init: -612,
      show: 0,
      end: 612,
      unit: 'px'
    });
}

function createBreedButtons(){
    const buttons = document.getElementById('dogButtons');
    
    fetch("https://dogapi.dog/api/v2/breeds") 
    .then((result) => result.json())
    .then((resultJson) => {
        const resultArray = resultJson.data;
        resultArray.forEach((breed) => {
            const button = document.createElement('button');
            button.textContent = breed["attributes"]["name"];
            buttons.appendChild(button);

            button.addEventListener('click', function() {
              const paragraph = document.getElementById('container');
              paragraph.id = breed["attributes"]["name"];
              paragraph.innerText = "Name: " + breed["attributes"]["name"];
              paragraph.innerText += "\n\nDescription: " + breed["attributes"]["description"];
              paragraph.innerText += "\n\nMin life: " + breed["attributes"]["life"]["min"];
              paragraph.innerText += "\n\nMax life: " + breed["attributes"]["life"]["max"];

              buttons.appendChild(paragraph);
            });
        });
    });

}

function AudioCommands(){ 
    if (annyang) {
        const commands = {
            'hello': () => { alert('Hello world!'); },
            'change the color to :color': function(color){
                document.body.style.background = color;
            },
            'navigate to :page': function(page){
                window.location.href = "INST377-Assignment2-" + page + ".html";
            },
            'Load Dog Breed :DogBreedName': function(DogBreedName){
                const button = document.getElementById(DogBreedName);
                    const paragraph = document.getElementById(DogBreedName);
                    paragraph.style.display = 'block';
            }
        };
          
        annyang.addCommands(commands);
          
        annyang.start();
    }  
}

window.onload = loadSlider;