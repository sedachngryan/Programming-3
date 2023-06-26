socket = io();
var side = 20, m = 50, n = 40;
multForGrass = 8
multForgrassEater = 6
diePredator = 0
multForFly = 13
var grassColor = "#00e300";
var grassEaterColor = "255, 255, 0 ";
var predatorColor = "black";
var flyColor = "brown";
var energyColor = "red";
var changeColor = "blue";


function setup() {
  frameRate(40);
  createCanvas(n * side, m * side);
  background('#e8e8e8');

  button1 = document.getElementById('summer');
  button2 = document.getElementById('winter');
  button3 = document.getElementById('fair');
  button4 = document.getElementById('start');
  button5 = document.getElementById('stop');
  button1.addEventListener("click", onColorChange)
  button2.addEventListener("click", onColorChange)
  button3.addEventListener("click", onColorChange)
  button4.addEventListener("click", Start)
  button5.addEventListener("click", Stop)

}

function onColorChange() {
  if (event.target.id == "summer") {
    grassColor = "#00FF00"
    grassEaterColor = "#dbfc00"
    predatorColor = "#39393b"
    flyColor = "#fffe3b"
    multForGrass = 10;
    diePredator = 15;
    multForgrassEater = 9
    multForFly = 15

  }
  else if (event.target.id == "winter") {
    grassColor = "#FFFFFF"
    grassEaterColor = "#ffffe7"
    predatorColor = "#595a59"
    flyColor = "#f2c786"
    multForGrass = 6;
    diePredator = 8
    multForgrassEater = 7
    multForFly = 10
  }

  else if (event.target.id == "fair") {
    grassColor = "red";
    grassEaterColor = "red";
    predatorColor = "red";
    flyColor = "red";
    energyColor = "red";
    changeColor = "red";
    multForGrass = 0;
    multForgrassEater = 0;
    multForFly = 0

  }

  let data = {
    multForGrass: multForGrass,
    multForgrassEater: multForgrassEater,
    diePredator: diePredator,
    multForFly: multForFly,
    energyColor: energyColor,
    changeColor: changeColor
  }

  socket.on("matrix", drawMatrix);
  socket.emit("afterClick", data)
}
function startStop(){
  moveRight();
  change();
  }
  
  function moveRight(){
  imgObj.style.left = parseInt(imgObj.style.left) + 10 + 'px';
  animate = setTimeout(moveRight,50); 
  }
  
  function change(){
  var elem = document.getElementById("startButton");
  if (elem.value=="Stop") elem.value = "Start";
  else elem.value = "Stop";
  }
  
  function stop(){
  clearTimeout(animate);
  }
  
  window.onload =init;
 
function drawMatrix(data) {
  matrix = data.matrix
  for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
      if (matrix[y][x] == 0) {
        fill("#acacac");
      }
      else if (matrix[y][x] == 1) {
        fill(grassColor);
      }
      else if (matrix[y][x] == 2) {
        fill(grassEaterColor);
      }
      else if (matrix[y][x] == 3) {
        fill(predatorColor);
      }
      else if (matrix[y][x] == 4) {
        fill("energyColor");
      }
      else if (matrix[y][x] == 5) {
        fill("changeColor");
      }
      else if (matrix[y][x] == 6) {
        fill(flyColor);
      }
      rect(x * side, y * side, side, side);
    }
  }
}
socket.on("matrix", drawMatrix);

