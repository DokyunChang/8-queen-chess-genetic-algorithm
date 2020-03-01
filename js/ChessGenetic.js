function ChessGenetic(genoSize, population, mutFactor) {
    this.population = population;
    this.genoSize = genoSize;
    this.mutateFactor = mutFactor;
    this.chromosomes = new Array(this.population);

    for (let index = 0; index < this.chromosomes.length; index++) {
        this.chromosomes[index] = new Chromosome(this.genoSize);
        this.chromosomes[index].initalize();
    }
}

// Select parents from current generation using Roulette Wheel Selection
ChessGenetic.prototype.selection = function() {
    let totalSum = 0;
    let partialSum = 0;
    let rand = 0;
    let newChromosomes = [];

    this.chromosomes.forEach(chromosome => {
        totalSum += chromosome.fitness;
    });
    
    // Select next generation of parent chromosomes
    for (let index = 0; index < this.population; index++) {
        rand = Math.random()*totalSum;

        for (let i = 0; i < this.population; i++) {
            partialSum += this.chromosomes[i].fitness;
    
            if (partialSum >= rand) {
                partialSum = 0;
                newChromosomes.push(this.chromosomes[i]);
                break;
            }
            
        }
    }

    // Replace current generation with the new parents
    this.chromosomes = newChromosomes;
}

// Run the genetic algorithm
ChessGenetic.prototype.step = function() {
    this.chromosomes.forEach(chromosome => {
        //chromosome.getFitness();
        chromosome.setFitness();
    });
    console.log('parent',this.chromosomes);
    this.selection();
    console.log('child',this.chromosomes);

    for (let index = 0; index < this.population; index+=2) {
        this.chromosomes[index].crossover(this.chromosomes[index+1]);
        this.chromosomes[index].mutate(0.01);
        this.chromosomes[index+1].mutate(0.01);
    }

}

ChessGenetic.prototype.getBestChromosome = function() {
    let bestChromosome = new Chromosome(this.genoSize);

    this.chromosomes.forEach(chromosome => {
        if (chromosome.fitness >= bestChromosome.fitness) {
            bestChromosome = chromosome;
        }
    });

    return bestChromosome;
}