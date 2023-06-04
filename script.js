
var matrix = [
    [0, 2, 4, 1, 0, 3, 2, 1, 0, 1, 0, 3, 5, 2, 1, 1, 2, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [4, 3, 1, 2, 3, 5, 2, 0, 2, 0, 0, 1, 0, 0, 1, 4, 1, 0, 0, 1, 0, 0, 1, 0, 1, 4, 1, 0, 0, 0, 0, 2, 0, 0, 1, 2, 3, 0, 5, 0],
    [1, 2, 2, 5, 1, 1, 1, 4, 0, 1, 0, 1, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 3, 4, 2, 1, 1, 0, 1, 0, 4, 2, 0, 3, 0, 1, 1, 2, 1, 1, 0, 3, 2, 1, 3, 1, 3, 1, 1, 2, 1, 0, 0, 1, 2, 2, 5, 0, 0],
    [1, 1, 2, 2, 3, 2, 1, 3, 2, 1, 3, 1, 1, 0, 1, 0, 1, 3, 0, 3, 2, 1, 1, 2, 3, 4, 1, 0, 0, 3, 0, 3, 2, 1, 0, 0, 1, 0, 0, 1],
    [2, 1, 2, 0, 4, 0, 1, 0, 0, 3, 2, 1, 2, 0, 3, 2, 1, 2, 2, 2, 3, 0, 2, 3, 1, 1, 3, 5, 0, 0, 2, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 3, 3, 2, 2, 4, 0, 1, 1, 0, 4, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 4, 1, 1, 0, 2, 3, 0, 4, 0, 0, 2, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 3, 1, 0, 0, 1, 3, 1, 0, 3, 1, 0, 1, 2, 2, 2, 3, 5, 1, 5, 1, 4, 2, 1, 0, 4, 0, 1, 3, 0, 1, 0, 1, 2, 2, 1],
    [0, 1, 0, 0, 5, 0, 1, 0, 4, 1, 0, 3, 2, 4, 3, 0, 1, 0, 0, 2, 2, 3, 3, 0, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 4, 1, 0, 0, 0],
    [1, 1, 1, 1, 2, 1, 3, 2, 1, 1, 2, 1, 1, 3, 1, 2, 4, 1, 1, 4, 0, 4, 1, 0, 1, 4, 4, 2, 2, 2, 0, 1, 0, 2, 1, 0, 4, 2, 2, 1],
    [1, 1, 5, 0, 4, 3, 1, 4, 2, 1, 2, 4, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 3, 1, 5, 1, 3, 3, 2, 0, 1, 2, 0, 3, 4, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 5, 1, 4, 0, 0, 4, 2, 4, 2, 3, 5, 4, 0, 5, 1, 0, 0, 1, 2, 3, 1, 5, 3, 0, 2, 3, 4, 0, 5, 1, 0, 3, 2, 2, 1],
    [0, 1, 2, 0, 2, 0, 1, 3, 0, 1, 0, 1, 1, 1, 1, 3, 1, 0, 0, 1, 1, 0, 3, 4, 1, 2, 1, 0, 2, 2, 2, 1, 3, 0, 1, 3, 1, 2, 2, 2],
    [0, 1, 3, 2, 2, 1, 3, 2, 1, 0, 1, 1, 0, 0, 2, 0, 1, 4, 0, 5, 0, 2, 1, 0, 1, 1, 2, 0, 0, 2, 0, 3, 0, 2, 1, 5, 2, 0, 0, 0],
    [1, 1, 2, 3, 1, 1, 1, 1, 1, 4, 3, 1, 0, 0, 1, 0, 2, 3, 0, 2, 1, 0, 1, 3, 3, 0, 1, 0, 3, 0, 0, 1, 0, 0, 2, 4, 1, 3, 0, 1],
    [0, 1, 0, 5, 1, 1, 2, 3, 3, 1, 3, 1, 3, 2, 1, 4, 1, 0, 0, 0, 2, 3, 4, 2, 0, 1, 1, 0, 0, 2, 2, 1, 5, 0, 1, 0, 1, 0, 5, 0],
    [1, 2, 0, 2, 0, 0, 1, 4, 1, 1, 4, 1, 4, 0, 4, 0, 0, 0, 0, 2, 0, 2, 1, 3, 5, 3, 1, 0, 0, 0, 0, 1, 3, 3, 3, 2, 3, 0, 3, 0],
    [0, 0, 1, 0, 3, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 3, 0, 2, 2, 3, 0, 3, 1, 2, 2, 3, 3, 0, 2, 2, 2, 0, 2, 1, 0, 1, 5, 0, 1],
    [2, 0, 1, 0, 2, 1, 2, 0, 2, 0, 0, 2, 2, 3, 1, 0, 1, 0, 0, 3, 0, 0, 1, 3, 2, 1, 1, 0, 2, 0, 0, 1, 2, 0, 3, 3, 1, 0, 2, 1],
    [0, 1, 0, 3, 0, 5, 1, 4, 0, 1, 0, 1, 0, 2, 1, 4, 1, 2, 2, 0, 0, 2, 1, 1, 0, 1, 3, 0, 5, 0, 0, 1, 0, 0, 1, 0, 1, 5, 0, 1],
    [0, 0, 1, 1, 4, 1, 4, 3, 2, 2, 3, 1, 4, 3, 2, 1, 2, 1, 1, 0, 0, 2, 0, 1, 0, 0, 2, 1, 1, 4, 1, 2, 0, 2, 1, 1, 4, 0, 0, 0],
    [1, 1, 2, 3, 0, 3, 1, 0, 0, 1, 1, 3, 0, 0, 1, 0, 0, 5, 0, 0, 0, 0, 0, 3, 1, 1, 5, 0, 2, 2, 3, 1, 0, 3, 1, 2, 1, 2, 1, 1],
    [1, 1, 5, 0, 3, 0, 1, 2, 2, 1, 1, 1, 0, 0, 1, 0, 2, 0, 1, 1, 2, 1, 2, 1, 2, 1, 1, 3, 1, 0, 5, 1, 3, 0, 3, 0, 1, 3, 0, 1],
    [0, 1, 0, 4, 1, 4, 4, 0, 3, 1, 4, 1, 2, 0, 1, 0, 1, 1, 0, 1, 1, 2, 1, 2, 0, 2, 5, 1, 5, 1, 1, 2, 0, 0, 5, 3, 3, 5, 4, 0],
    [0, 2, 5, 0, 1, 2, 4, 5, 1, 0, 0, 1, 5, 0, 1, 1, 1, 2, 0, 0, 2, 1, 0, 4, 1, 4, 0, 1, 4, 1, 1, 1, 0, 0, 2, 3, 1, 0, 0, 1],
    [5, 1, 0, 0, 1, 0, 1, 0, 4, 1, 0, 2, 2, 1, 2, 0, 1, 1, 3, 1, 1, 4, 1, 3, 1, 1, 2, 3, 0, 3, 2, 1, 0, 1, 1, 2, 3, 0, 0, 1],
    [0, 1, 0, 3, 0, 1, 4, 1, 4, 1, 0, 1, 2, 0, 1, 0, 0, 1, 1, 1, 1, 0, 4, 2, 3, 0, 1, 3, 1, 1, 2, 3, 2, 0, 5, 0, 1, 4, 5, 0],
    [1, 2, 0, 2, 0, 2, 0, 3, 2, 1, 3, 1, 1, 0, 2, 0, 1, 3, 0, 3, 2, 1, 1, 2, 1, 1, 1, 0, 0, 3, 0, 1, 5, 4, 1, 3, 1, 0, 3, 1],
    [2, 1, 2, 0, 4, 0, 1, 0, 0, 3, 0, 5, 1, 5, 1, 2, 2, 2, 2, 2, 3, 0, 3, 5, 1, 0, 2, 0, 2, 0, 0, 1, 0, 0, 1, 0, 5, 0, 0, 4],
    [1, 1, 3, 3, 2, 2, 3, 0, 2, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 2, 1, 1, 0, 0, 3, 3, 0, 2, 1, 3, 2, 1, 2, 2, 2],
    [2, 1, 2, 1, 0, 3, 1, 5, 0, 1, 3, 1, 1, 3, 3, 0, 1, 2, 2, 2, 3, 3, 1, 0, 4, 2, 1, 2, 0, 0, 4, 2, 0, 0, 1, 0, 1, 2, 2, 1],
    [0, 2, 0, 0, 2, 0, 1, 0, 1, 4, 0, 3, 2, 0, 1, 0, 2, 0, 0, 2, 2, 3, 2, 3, 1, 1, 0, 2, 3, 0, 1, 0, 3, 1, 0, 1, 0, 0, 3, 4],
    [1, 1, 0, 1, 0, 1, 3, 2, 1, 1, 2, 1, 1, 3, 4, 2, 0, 2, 1, 1, 0, 0, 1, 0, 1, 1, 1, 2, 2, 2, 0, 1, 0, 0, 1, 0, 1, 5, 2, 1],
    [1, 1, 0, 0, 0, 3, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 1, 0, 2, 1, 2, 1, 1, 3, 2, 3, 1, 3, 3, 2, 0, 1, 3, 0, 1, 3, 1, 0, 0, 0],
    [0, 5, 1, 3, 1, 5, 1, 0, 4, 0, 0, 2, 2, 2, 1, 0, 1, 0, 5, 1, 0, 0, 1, 2, 1, 5, 4, 3, 2, 0, 3, 1, 0, 0, 2, 0, 1, 2, 2, 1],
    [0, 1, 2, 0, 2, 0, 1, 3, 0, 1, 0, 1, 1, 1, 0, 2, 2, 0, 0, 1, 1, 0, 2, 0, 1, 1, 1, 0, 2, 2, 2, 3, 5, 1, 1, 0, 4, 2, 3, 2],
    [0, 2, 3, 2, 3, 1, 3, 2, 2, 1, 4, 1, 2, 5, 1, 0, 1, 1, 2, 3, 1, 3, 1, 2, 1, 1, 1, 2, 2, 0, 2, 1, 0, 0, 1, 4, 1, 2, 2, 2],
    [1, 1, 1, 0, 2, 0, 5, 1, 1, 1, 1, 1, 2, 3, 1, 0, 3, 0, 0, 2, 0, 0, 1, 0, 2, 2, 2, 3, 3, 3, 2, 1, 0, 0, 3, 0, 1, 5, 2, 0],
    [2, 0, 0, 1, 0, 0, 0, 1, 0, 3, 4, 0, 0, 3, 0, 2, 0, 1, 0, 0, 1, 0, 0, 5, 4, 0, 4, 0, 0, 0, 3, 3, 3, 2, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 2, 0, 3, 2, 0, 2, 3, 0, 1, 1, 2, 2, 0, 0, 1, 2, 0, 1, 1, 0, 0, 2, 1, 4, 0, 0, 0, 3, 1, 0, 5, 1, 0, 1, 2, 2, 1],
    [2, 1, 0, 2, 3, 0, 0, 1, 0, 1, 2, 0, 0, 0, 0, 2, 5, 1, 5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 2, 2, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 5, 3, 0, 1, 3, 0, 1, 1, 0, 2, 0, 0, 0, 1, 0, 2, 2, 3, 2, 5, 0, 1, 3, 0, 0, 0, 2, 3, 3, 2, 1, 0, 0, 1, 0, 1],
    [5, 1, 0, 1, 0, 0, 2, 0, 4, 0, 2, 3, 4, 2, 0, 2, 3, 2, 0, 2, 0, 1, 0, 0, 0, 4, 0, 1, 1, 1, 0, 2, 2, 2, 1, 0, 0, 1, 5, 1],
    [0, 0, 1, 0, 4, 0, 0, 1, 0, 1, 0, 1, 0, 5, 2, 0, 0, 3, 1, 0, 1, 0, 0, 1, 2, 5, 4, 0, 2, 3, 1, 1, 0, 0, 1, 3, 1, 2, 0, 0],
    [2, 0, 3, 2, 3, 0, 0, 0, 3, 0, 2, 0, 2, 0, 0, 3, 1, 1, 2, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 5, 2, 3, 1, 1, 0, 5, 1, 1, 0, 0],
    [0, 3, 2, 0, 2, 2, 5, 1, 4, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 2, 1, 1, 0, 5, 0, 0, 0, 1, 0, 2, 0, 0, 5, 0, 1, 0],
    [0, 1, 0, 2, 3, 0, 0, 3, 0, 1, 2, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 3, 0, 3, 4, 0, 1, 0, 1, 1, 0, 2, 2, 2, 1, 0, 0, 1]
];

var side = 15;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var EnergyArr = [];
var changeArr = [];


function setup() {
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grEater);
            }
            else if (matrix[y][x] == 3) {
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
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill(255, 255, 0);
            }
            else if (matrix[y][x] == 3) {
                fill(0, 0, 0);
            }
            else if (matrix[y][x] == 4) {
                fill("red");
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);
        }
}

    for (var i in grassArr) {
        grassArr[i].mul()
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat()
        grassEaterArr[i].move()
        grassEaterArr[i].mult()
        grassEaterArr[i].die()
    }


    for (var i in predatorArr) {
        predatorArr[i].eat()
        predatorArr[i].move()
        predatorArr[i].mult()
        predatorArr[i].die()
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


    if (grassArr.length == 0) {
        for (var i = 0; i < 40; i++) {
            var x = floor(random(matrix[0].length - 1))
            var y = floor(random(matrix.length - 1))
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }


    }

    if (grassEaterArr.length == 0) {
        for (var i = 0; i < 30; i++) {
            var x = floor(random(matrix[0].length - 1))
            var y = floor(random(matrix.length - 1))
            matrix[y][x] = 2
            var grE = new GrassEater(x, y, 2)
            grassEaterArr.push(grE)
        }
    }

    if (predatorArr.length == 0) {
        for (var i = 0; i < 15; i++) {
            var x = floor(random(matrix[0].length - 1))
            var y = floor(random(matrix.length - 1))
            matrix[y][x] = 3
            var predator = new Predator(x, y, 3)
            predatorArr.push(predator)
        }
    }

    if (EnergyArr.length == 0) {
        for (var i = 0; i < 10; i++) {
            var x = floor(random(matrix[0].length - 1))
            var y = floor(random(matrix.length - 1))
            matrix[y][x] = 4
            var energy = new Energy(x, y, 4)
            EnergyArr.push(energy)
        }
    }
    if (changeArr.length == 0) {
        for (var i = 0; i < 10; i++) {
            var x = floor(random(matrix[0].length - 1))
            var y = floor(random(matrix.length - 1))
            matrix[y][x] = 5
            var change = new Change (x, y, 5)
            changeArr.push(change)
        }
    }

}