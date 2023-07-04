var express = require("express");
var fs = require('fs');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("../client"));
app.get("/", function (req, res) {
    res.redirect("index.html");
});
server.listen(3000, function () {
    console.log("App is running on port 3000");
});

grassArr = [];
grassEaterArr = [];
predatorArr = [];
EnergyArr = [];
changeArr = [];
flyArr = [];

Grass = require("./modules/classGrass");
GrassEater = require("./modules/classGrassEater");
Predator = require("./modules/classPredator");
Energy = require("./modules/classEnergy");
Change = require("./modules/classChange");
Fly = require("./modules/classfly");
random = require("./modules/random");

multForGrass = 8
multForgrassEater = 6
diePredator = 0
multForFly = 13


io.on("connection", function (socket) {
    socket.on("afterClick", function (data) {
        multForGrass = data.multForGrass
        multForgrassEater = data.multForgrassEater
        diePredator = data.diePredator
        multForGrass = data.multForGrass
    });
    setInterval(drawForBackend, 5000);
});

matrix = [
    [0, 2, 4, 1, 0, 3, 2, 1, 0, 1, 6, 3, 5, 2, 1, 1, 2, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [4, 3, 1, 2, 3, 5, 2, 0, 2, 0, 0, 1, 0, 0, 1, 4, 1, 0, 0, 1, 0, 0, 1, 0, 1, 4, 1, 0, 0, 0, 0, 2, 0, 0, 1, 2, 3, 0, 5, 0],
    [1, 2, 2, 5, 1, 1, 1, 4, 0, 1, 0, 1, 3, 1, 1, 1, 1, 6, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 3, 4, 2, 1, 1, 0, 1, 0, 4, 2, 6, 3, 0, 1, 1, 2, 1, 1, 0, 3, 2, 1, 3, 1, 3, 1, 1, 2, 1, 0, 0, 1, 2, 2, 5, 0, 0],
    [1, 1, 2, 2, 3, 2, 1, 3, 2, 1, 3, 1, 1, 0, 1, 0, 1, 3, 0, 3, 2, 1, 1, 2, 3, 4, 1, 0, 0, 3, 0, 3, 2, 1, 0, 0, 1, 0, 0, 1],
    [2, 1, 2, 0, 4, 0, 1, 6, 0, 3, 2, 1, 2, 0, 3, 2, 1, 2, 2, 2, 3, 0, 2, 3, 1, 1, 3, 5, 0, 0, 2, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 3, 3, 2, 2, 4, 6, 1, 1, 0, 4, 1, 0, 1, 0, 1, 0, 1, 6, 1, 6, 1, 0, 4, 1, 1, 0, 2, 3, 0, 4, 0, 0, 2, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 3, 1, 0, 0, 1, 3, 1, 0, 3, 1, 0, 1, 2, 2, 2, 3, 5, 1, 5, 1, 4, 2, 1, 0, 4, 0, 1, 3, 0, 1, 0, 1, 2, 2, 1],
    [0, 1, 0, 0, 5, 0, 1, 0, 4, 1, 0, 3, 2, 4, 3, 0, 1, 0, 0, 2, 2, 3, 3, 0, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 4, 1, 0, 0, 0],
    [1, 1, 1, 1, 2, 1, 3, 2, 1, 1, 2, 1, 1, 3, 1, 2, 4, 1, 1, 4, 0, 4, 1, 0, 1, 4, 4, 2, 2, 2, 0, 1, 0, 2, 1, 0, 4, 2, 2, 1],
    [1, 1, 5, 0, 4, 3, 1, 4, 2, 1, 2, 4, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 3, 1, 5, 1, 3, 3, 2, 0, 1, 2, 0, 3, 4, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 5, 1, 4, 0, 0, 4, 2, 4, 2, 3, 5, 4, 6, 5, 1, 0, 0, 1, 2, 6, 1, 5, 3, 0, 2, 3, 4, 0, 5, 1, 0, 3, 2, 2, 1],
    [0, 1, 2, 0, 2, 6, 1, 3, 0, 1, 0, 1, 1, 1, 1, 3, 1, 0, 0, 1, 1, 6, 3, 4, 1, 2, 6, 0, 2, 2, 2, 1, 3, 0, 1, 3, 1, 2, 2, 2],
    [0, 1, 3, 2, 2, 1, 3, 2, 1, 0, 1, 1, 0, 0, 2, 0, 1, 4, 0, 5, 6, 2, 1, 0, 1, 1, 2, 0, 0, 2, 0, 3, 0, 2, 1, 5, 2, 0, 0, 0],
    [1, 1, 2, 3, 1, 1, 1, 1, 1, 4, 3, 1, 0, 0, 1, 0, 2, 3, 0, 2, 1, 0, 1, 3, 3, 0, 1, 0, 3, 0, 0, 1, 0, 0, 2, 4, 1, 3, 0, 1],
    [0, 1, 0, 5, 1, 1, 2, 3, 3, 1, 3, 1, 3, 2, 1, 4, 1, 6, 0, 0, 2, 3, 4, 2, 0, 1, 1, 0, 0, 2, 2, 1, 5, 0, 1, 0, 1, 0, 5, 0],
    [1, 2, 0, 2, 0, 0, 1, 4, 1, 1, 4, 1, 4, 0, 4, 0, 0, 0, 0, 2, 0, 2, 1, 3, 5, 3, 1, 0, 0, 0, 0, 1, 3, 3, 3, 2, 3, 0, 3, 0],
    [0, 0, 1, 0, 3, 0, 0, 1, 0, 1, 0, 1, 0, 6, 1, 0, 3, 0, 2, 2, 3, 0, 3, 1, 2, 2, 3, 3, 0, 2, 2, 2, 0, 2, 1, 0, 1, 5, 0, 1],
    [2, 0, 1, 0, 2, 1, 2, 6, 2, 0, 0, 2, 2, 3, 1, 0, 1, 0, 0, 3, 0, 6, 1, 3, 2, 1, 1, 0, 2, 0, 0, 1, 2, 0, 3, 3, 1, 0, 2, 1],
    [0, 1, 0, 3, 0, 5, 1, 4, 0, 1, 0, 1, 0, 2, 1, 4, 6, 2, 2, 0, 0, 2, 1, 1, 0, 1, 3, 0, 5, 0, 0, 1, 0, 0, 1, 0, 1, 5, 0, 1],
    [0, 0, 1, 1, 4, 1, 4, 3, 2, 2, 3, 1, 4, 3, 2, 1, 2, 1, 1, 6, 0, 2, 0, 1, 0, 0, 2, 1, 1, 4, 1, 2, 0, 2, 1, 1, 4, 0, 0, 0],
    [1, 1, 2, 3, 0, 3, 1, 0, 0, 1, 1, 3, 0, 0, 1, 0, 0, 5, 0, 0, 0, 6, 0, 3, 1, 1, 5, 0, 2, 2, 3, 1, 0, 3, 1, 2, 1, 2, 1, 1],
    [1, 1, 5, 0, 3, 0, 1, 2, 2, 1, 1, 1, 0, 0, 1, 0, 2, 0, 1, 1, 2, 1, 2, 1, 2, 1, 1, 3, 1, 0, 5, 1, 3, 0, 3, 0, 1, 3, 0, 1],
    [0, 1, 0, 4, 1, 4, 4, 0, 3, 1, 4, 1, 2, 0, 1, 0, 1, 1, 0, 1, 1, 2, 1, 2, 0, 2, 5, 1, 5, 1, 1, 2, 0, 0, 5, 3, 3, 5, 4, 0],
    [0, 2, 5, 0, 1, 2, 4, 5, 1, 0, 0, 1, 5, 0, 1, 1, 1, 2, 6, 0, 2, 1, 0, 4, 1, 4, 0, 1, 4, 1, 1, 1, 0, 0, 2, 3, 1, 0, 0, 1],
    [5, 1, 0, 0, 1, 0, 1, 0, 4, 1, 0, 2, 2, 1, 2, 0, 1, 1, 3, 1, 1, 4, 1, 3, 1, 1, 2, 3, 0, 3, 2, 1, 0, 1, 1, 2, 3, 0, 0, 1],
    [0, 1, 0, 3, 0, 1, 4, 1, 4, 1, 0, 1, 2, 0, 1, 0, 0, 1, 1, 1, 1, 0, 4, 2, 3, 0, 1, 3, 1, 1, 2, 3, 2, 0, 5, 0, 1, 4, 5, 0],
    [1, 2, 0, 2, 0, 2, 0, 3, 2, 1, 3, 1, 1, 0, 2, 0, 1, 3, 0, 3, 2, 1, 1, 2, 1, 1, 1, 0, 0, 3, 0, 1, 5, 4, 1, 3, 1, 0, 3, 1],
    [2, 1, 2, 0, 4, 0, 1, 0, 6, 3, 0, 5, 1, 5, 1, 2, 2, 2, 2, 2, 3, 0, 3, 5, 1, 0, 2, 0, 2, 0, 0, 1, 0, 0, 1, 0, 5, 0, 0, 4],
    [1, 1, 3, 3, 2, 2, 3, 0, 2, 6, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 2, 1, 1, 0, 0, 3, 3, 0, 2, 1, 3, 2, 1, 2, 2, 2],
    [2, 1, 2, 1, 0, 3, 1, 5, 0, 1, 3, 1, 1, 3, 3, 0, 1, 2, 2, 2, 3, 3, 1, 0, 4, 2, 1, 2, 0, 0, 4, 2, 0, 0, 1, 0, 1, 2, 2, 1],
    [0, 2, 0, 0, 2, 0, 1, 6, 1, 4, 0, 3, 2, 0, 1, 0, 2, 0, 6, 2, 2, 3, 2, 3, 1, 1, 0, 2, 3, 0, 1, 0, 3, 1, 0, 1, 0, 0, 3, 4],
    [1, 1, 0, 1, 0, 1, 3, 2, 1, 1, 2, 1, 1, 3, 4, 2, 0, 2, 1, 1, 0, 0, 1, 0, 1, 6, 1, 2, 2, 2, 0, 1, 0, 0, 1, 0, 1, 5, 2, 1],
    [1, 1, 0, 0, 0, 3, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 1, 0, 2, 1, 2, 1, 1, 3, 2, 3, 1, 3, 3, 2, 0, 1, 3, 0, 1, 3, 1, 0, 0, 0],
    [0, 5, 1, 3, 1, 5, 1, 0, 4, 0, 0, 2, 2, 2, 1, 0, 1, 0, 5, 1, 0, 0, 1, 2, 1, 5, 4, 3, 2, 0, 3, 1, 0, 0, 2, 0, 1, 2, 2, 1],
    [0, 1, 2, 0, 2, 0, 1, 3, 0, 1, 0, 1, 1, 1, 0, 2, 2, 0, 0, 1, 1, 0, 2, 0, 1, 1, 1, 6, 2, 2, 2, 3, 5, 1, 1, 0, 4, 2, 3, 2],
    [0, 2, 3, 2, 3, 1, 3, 2, 2, 1, 4, 1, 2, 5, 1, 0, 1, 1, 2, 3, 1, 3, 1, 2, 1, 1, 1, 2, 2, 0, 2, 1, 0, 0, 1, 4, 1, 2, 2, 2],
    [1, 1, 1, 0, 2, 0, 5, 1, 1, 1, 1, 1, 2, 3, 1, 0, 3, 0, 0, 2, 0, 0, 1, 0, 2, 2, 2, 3, 3, 3, 2, 1, 0, 0, 3, 0, 1, 5, 2, 0],
    [2, 0, 0, 1, 0, 0, 0, 1, 0, 3, 4, 0, 0, 3, 0, 2, 0, 1, 0, 0, 1, 0, 0, 5, 4, 0, 4, 0, 0, 0, 3, 3, 3, 2, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 2, 0, 3, 2, 0, 2, 3, 0, 1, 1, 2, 2, 0, 0, 1, 2, 0, 1, 1, 6, 0, 2, 1, 4, 0, 0, 0, 3, 1, 0, 5, 1, 0, 1, 2, 2, 1],
    [2, 1, 0, 2, 3, 0, 0, 1, 0, 1, 2, 0, 0, 0, 0, 2, 5, 1, 5, 0, 0, 1, 0, 0, 0, 06, 0, 0, 1, 0, 1, 2, 2, 2, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 5, 3, 0, 1, 3, 0, 1, 1, 0, 2, 0, 0, 0, 1, 0, 2, 2, 3, 2, 5, 0, 1, 3, 0, 0, 0, 2, 3, 3, 2, 1, 0, 0, 1, 0, 1],
    [5, 1, 0, 1, 0, 0, 2, 0, 4, 0, 2, 3, 4, 2, 0, 2, 3, 2, 0, 2, 0, 1, 0, 0, 0, 4, 0, 1, 1, 1, 0, 2, 2, 2, 1, 0, 0, 1, 5, 1],
    [0, 0, 1, 0, 4, 0, 0, 1, 0, 1, 0, 1, 0, 5, 2, 0, 0, 3, 1, 0, 1, 0, 0, 1, 2, 5, 4, 0, 2, 3, 1, 1, 0, 0, 1, 3, 1, 2, 0, 0],
    [2, 0, 3, 2, 3, 0, 0, 0, 3, 0, 2, 0, 2, 0, 0, 3, 1, 1, 2, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 5, 2, 3, 1, 1, 0, 5, 1, 1, 0, 0],
    [0, 3, 2, 0, 2, 2, 5, 1, 4, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 2, 1, 1, 0, 5, 0, 0, 0, 1, 0, 2, 0, 0, 5, 0, 1, 0],
    [0, 1, 0, 2, 3, 0, 0, 3, 0, 1, 2, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 3, 0, 3, 4, 0, 1, 0, 1, 1, 0, 2, 2, 2, 1, 0, 0, 1],
    [0, 0, 1, 0, 3, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 3, 0, 2, 2, 3, 0, 3, 1, 2, 2, 3, 3, 0, 2, 2, 2, 0, 2, 1, 0, 1, 5, 0, 1],
    [2, 0, 1, 0, 2, 1, 2, 0, 2, 0, 0, 2, 2, 3, 1, 0, 1, 0, 0, 3, 0, 0, 1, 3, 2, 1, 1, 0, 2, 0, 0, 1, 2, 0, 3, 3, 1, 0, 2, 1],
    [0, 1, 0, 3, 0, 5, 1, 4, 0, 1, 0, 1, 0, 2, 1, 4, 1, 2, 2, 0, 0, 2, 1, 1, 0, 1, 3, 0, 5, 0, 0, 1, 0, 0, 1, 0, 1, 5, 0, 1],
    [0, 0, 1, 1, 4, 1, 4, 3, 2, 2, 3, 1, 4, 3, 2, 1, 2, 1, 1, 0, 0, 2, 0, 1, 0, 0, 2, 1, 1, 4, 1, 2, 0, 2, 1, 1, 4, 0, 0, 0]
]

var isFemale = true;
function Createobj() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                isFemale = !isFemale
                var grEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grEater);
            }
            else if (matrix[y][x] == 3) {
                isFemale = isFemale
                var predator = new Predator(x, y, 3);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var energy = new Energy(x, y, 4);
                EnergyArr.push(energy);
            }
            else if (matrix[y][x] == 5) {
                var change = new Change(x, y, 5);
                changeArr.push(change);
            }
            else if (matrix[y][x] == 6) {
                isFemale = isFemale
                var fly = new Fly(x, y, 6);
                flyArr.push(fly);
            }
        }
    }
}
Createobj()

function drawForBackend() {
    for (var i in grassArr) {
        grassArr[i].mul(multForGrass)
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat()
        grassEaterArr[i].move()
        grassEaterArr[i].mult(multForgrassEater)
        grassEaterArr[i].die()
    }

    for (var i in predatorArr) {
        predatorArr[i].eat()
        predatorArr[i].move()
        predatorArr[i].mult()
        predatorArr[i].die(diePredator)
    }
    for (var i in EnergyArr) {
        EnergyArr[i].eat()
        EnergyArr[i].move()
        EnergyArr[i].mult()
        EnergyArr[i].die()
    }
    for (var i in changeArr) {
        changeArr[i].move()
        changeArr[i].change()
    }
    for (var i in flyArr) {

        flyArr[i].move()
        flyArr[i].fly()
        flyArr[i].mult(multForFly)
        flyArr[i].die()
    }

    if (grassArr.length == 0) {
        for (var i = 0; i < 40; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }


    }

    if (grassEaterArr.length == 0) {
        for (var i = 0; i < 30; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 2
            var grE = new GrassEater(x, y, 2)
            grassEaterArr.push(grE)
        }
    }

    if (predatorArr.length == 0) {
        for (var i = 0; i < 15; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 3
            var predator = new Predator(x, y, 3)
            predatorArr.push(predator)
        }
    }

    if (EnergyArr.length == 0) {
        for (var i = 0; i < 10; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 4
            var energy = new Energy(x, y, 4)
            EnergyArr.push(energy)
        }
    }
    if (changeArr.length == 0) {
        for (var i = 0; i < 10; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 5
            var change = new Change(x, y, 5)
            changeArr.push(change)
        }
    }
    if (flyArr.length == 0) {
        for (var i = 0; i < 12; i++) {
            var x = Math.floor(random(matrix[0].length - 1))
            var y = Math.floor(random(matrix.length - 1))
            matrix[y][x] = 5
            var fly = new Fly(x, y, 6)
            flyArr.push(fly)
        }
    }


    let sendData = {
        matrix: matrix
    }
    statistics = {
        grasses: grassArr.length,
        grassEaters: grassEaterArr.length,
        predatores: predatorArr.length,
        Energyes: EnergyArr.length,
        changes: changeArr.length,
        flys: flyArr.length
    }

    fs.writeFileSync('statistics.json', JSON.stringify(statistics, undefined, 2))
    mystatistics = fs.readFileSync('statistics.json').toString()
    io.sockets.emit("sendStatistics", JSON.parse(mystatistics))
    io.sockets.emit("matrix", sendData)
}
setInterval(drawForBackend, 1000)
