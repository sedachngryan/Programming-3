const LivingCreature = require("./classLivingCreature");
let random = require("./random");

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index, isFemale) {
        super(x, y, index);
        this.energy = 3;
        var isFemale = isFemale
    }

    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(char) {
        this.getNewDirections();
        return super.chooseCell(char);
    }

    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy >= 5) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            var newPredator = new Predator(newX, newY, 3)
            predatorArr.push(newPredator)
            this.energy = 3
        }
    }

    move() {
        var empty = random(this.chooseCell(0))
        if (!this.isFemale) {
            this.energy -= 2
        }
        else {
            this.energy--
        }
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }

    eat( ) {
        var food = random(this.chooseCell(2))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 2
        }
    }

    die(die) {
        if (this.energy <= die && !this.isFemale ) {
            matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1)
                }
            }
        }
    }
}
