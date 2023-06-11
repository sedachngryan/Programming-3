class Energy extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.count = 0
        this.energy = 10;
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

    chooseCell(char1, char2) {
        this.getNewCoordinates();
        return super.chooseCell(char1, char2);
    }

    eat() {
        var food = random(this.chooseCell(1))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                    break;
                }
            }
        }
        this.count++;
        if (this.count > 6) {
            this.energy++
            this.count = 0
            for (var i in predatorArr) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr[i].energy++;
                }
            }
        }
    }

    move() {
        var empty = random(this.chooseCell(0))
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }

    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy >= 16) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            var newEnergy = new Energy(newX, newY, 4)
            EnergyArr.push(newEnergy)
            this.energy = 10
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in EnergyArr) {
                if (EnergyArr[i].x == this.x && EnergyArr[i].y == this.y) {
                    EnergyArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}
