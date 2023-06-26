const LivingCreature = require("./classLivingCreature");
let random = require("./random");

module.exports = class Fly extends LivingCreature {

    constructor(x, y, index, isFemale) {
        super(x, y, index)
        this.energy = 12;
        this.directions = [];
        this.isFemale = isFemale
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);

    }

    choosePredatorCell() {
        this.getNewCoordinates()
        var found = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 3) {
                    found.push([x, y])
                }
            }
        }
        return found;

    }


    mult(multForFly) {
        var empty = random(this.chooseCell(0));
        if (empty && this.energy > multForFly) {
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 6;
            var newPredator = new fly(newX, newY, 6)
            flyArr.push(newPredator)
            this.energy = 8;
        }
    }


    move() {
        var empty = random(this.chooseCell(0))
        this.energy--;
        if (empty) {
            var newX = empty[0];
            var newY = empty[1];
            matrix[newY][newX] = 6
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        }

    }


    fly() {
        var flight = random(this.choosePredatorCell())
        if (flight && this.isFemale) {
            matrix[this.y][this.x] = 0;
            var newX = flight[0];
            var newY = flight[1];
            matrix[newY][newX] = 6
            this.x = newX
            this.y = newY
            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);

                }
            }
            this.energy ++
        }
    }



    die() {

        if (this.energy <= 0 && !this.isFemale) {
            matrix[this.y][this.x] = 0
            for (var i in flyArr) {
                if (flyArr[i].x == this.x && flyArr[i].y == this.y) {
                    flyArr.splice(i, 1)
                    break;
                }
            }
        }
    }




}
