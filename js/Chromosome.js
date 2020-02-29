function Chromosome(genoSize) {
    this.fitness = 0;
    this.geno = new Array(genoSize);
}

// Populate the geno to have 0s and 1s
Chromosome.prototype.initalize = function() {
    for (let index = 0; index < this.geno.length; index++) {
        Math.random() > 0.5 ? this.geno[index] = 1 : this.geno[index] = 0;   
    }
}

// One point crossover with two parent Chromosomes
Chromosome.prototype.crossOver = function(otherChromo) {
    let crossPoint = Math.round(Math.random()*this.geno.length);
    let offspring1 = this.geno.slice(0, crossPoint);
    let offspring2 = otherChromo.geno.slice(0, crossPoint);
    offspring1 = offspring1.concat(otherChromo.geno.slice(crossPoint));
    offspring2 = offspring2.concat(this.geno.slice(crossPoint));

    // Set offspring to the parent object
    this.geno = offspring1;
    otherChromo.geno = offspring2;
}

// Mutation of the geno
Chromosome.prototype.mutate = function(mutFactor) {
    for (let index = 0; index < this.geno.length; index++) {
        if (Math.random() < mutFactor) {
            this.geno[index] = 1 - this.geno[index];
        }
    }
}
