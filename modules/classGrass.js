const LivingCreature = require("./classLivingCreature");
let random = require("./random");

module.exports = class Grass extends LivingCreature {
    constructor(x, y, index, ) {
        super(x, y, index);
        this.multiply = 0;
    }

    mul(mult) {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= mult && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;
        }
    }
}

