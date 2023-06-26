const LivingCreature = require("./classLivingCreature");
let random = require("./random");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index, isFemale) {
        super(x, y, index);
        this.energy = 8;
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
    chooseCell(char1, char2) {
        this.getNewCoordinates();
        return super.chooseCell(char1, char2);
    }
    mult(mult) {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > mult) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            var newGrassEater = new GrassEater(newX, newY, 2, !this.isFemale)
            grassEaterArr.push(newGrassEater)
            this.energy = 8;
        }
    }

    move() {
        var empty = random(this.chooseCell(0))
        if (this.isFemale) {
            this.energy -= 2
        }
        else {
            this.energy--
        }

        if (empty && !this.isFemale) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    eat() {

        var food = random(this.chooseCell(1, 4))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                    break;
                }
            }
            for (var i in EnergyArr) {
                if (EnergyArr[i].x == newX && EnergyArr[i].y == newY) {
                    EnergyArr.splice(i, 4)
                    break;
                }
            }
            if (!this.isFemale) {
                this.energy += 4
            }
            else {
                this.energy -= 2
            }

        }
    }
    die() {
        if (this.energy <= 0 && this.isFemale) {
            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}
