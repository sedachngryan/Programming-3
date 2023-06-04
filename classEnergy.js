class Energy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.count = 0
        this.energy = 10;
        this.directions = [
        ]
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
        this.getNewDirections()
        var found = []
        for (var i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char1 || matrix[y][x] == char2) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    // choosePredatorCell() {
    //     this.getNewDirections()
    //     var found = []
    //     for (var y = 0; y < matrix.length; y++) {
    //         for (var x = 0; x < matrix.length; x++)
    //             if (matrix[y][x] == 3) {
    //                 found.push(x, y)
    //             }
    //     }
    //     return found
    // }
    // eat() {
    //     var food = random(this.chooseCell(1, 3))
    //     if (food) {
    //         matrix[this.y][this.x] = 0
    //         var newX = food[0]
    //         var newY = food[1]
    //         if (matrix[newY][newX] == 1) {
    //             for (var i in grassArr) {
    //                 if (grassArr[i].x == newX && grassArr[i].y == newY) {
    //                     grassArr.splice(i, 4)
    //                 }
    //             }
    //         }
    //         if (matrix[newY][newX] == 3) {
    //             for (var i in predatorArr) {
    //                 if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
    //                     predatorArr[i].energy++;
    //                     this.energy--
    //                 }
    //             }
    //         }

    //         matrix[newY][newX] = 4
    //         this.x = newX
    //         this.y = newY
    //     }
    //     this.count++;
    //     if (this.count > 6) {
    //         this.energy++
    //         this.count = 0
    //         for (var i in predatorArr) {
    //             if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
    //                 predatorArr[i].energy++;
    //                 this.energy--
    //             }
    //         }
    //     }
    // }

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
