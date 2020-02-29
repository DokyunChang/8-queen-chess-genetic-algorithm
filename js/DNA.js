function DNA(dnaSize) {
    this.fitness = 0;
    this.geno = new Array(dnaSize);
}

// Populate the geno to have 0s and 1s
DNA.prototype.initalize = function() {
    for (let index = 0; index < this.geno.length; index++) {
        Math.random() > 0.5 ? this.geno[index] = 1 : this.geno[index] = 0;   
    }
}

// One point crossover with two parent DNAs
DNA.prototype.crossOver = function(otherDNA) {
    let crossPoint = Math.round(Math.random()*this.geno.length);
    let offspring1 = this.geno.slice(0, crossPoint);
    let offspring2 = otherDNA.geno.slice(0, crossPoint);
    offspring1 = offspring1.concat(otherDNA.geno.slice(crossPoint));
    offspring2 = offspring2.concat(this.geno.slice(crossPoint));

    // Set offspring to the parent object
    this.geno = offspring1;
    otherDNA.geno = offspring2;
}

// Mutation of the geno
DNA.prototype.mutate = function(mutFactor) {
    for (let index = 0; index < this.geno.length; index++) {
        if (Math.random() < mutFactor) {
            this.geno[index] = 1 - this.geno[index];
        }
    }
}
