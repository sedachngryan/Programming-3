class Change {
    constructor(x, y, index) {
        super(x, y, index);
    }

    chooseCell(char0, char1, char2, char3, char4) {
        this.getNewCoordinates();
        return super.chooseCell(char0, char1, char2, char3, char4);
    }

    move() {
        var empty = random(this.chooseCell(0, 1, 2, 3, 4))
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
    change() {
        var empty = random(this.chooseCell(2, 3))
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            if (matrix[newY][newX] == 3) {
                for (var i in predatorArr) {
                    if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                        predatorArr.splice(i, 1)
                        var grE = new GrassEater(newX, newY, 2)
                        grassEaterArr.push(grE)
                        matrix[newY][newX] = 2
                        break;
                    }
                }
                if (matrix[newY][newX] == 2) {
                    for (var i in grassEaterArr) {
                        if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                            grassEaterArr.splice(i, 1)
                            var grE = new Predator(newX, newY, 3)
                            predatorArr.push(grE)
                            matrix[newY][newX] = 3
                            break;
                        }
                    }
                }
            }
        }
    }
}
