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
    let parentChromosome;

    this.chromosomes.forEach(chromosome => {
        totalSum += chromosome.fitness;
    });
    
    // Select next generation of parent chromosomes
    rand = Math.random()*totalSum;

    for (let i = 0; i < this.population; i++) {
        partialSum += this.chromosomes[i].fitness;
    
        if (partialSum >= rand) {
            parentChromosome = this.chromosomes[i];
            break;
        }
            
    }

    // Return the selected parent
    return parentChromosome
}

// Run the genetic algorithm
ChessGenetic.prototype.step = function() {
    this.chromosomes.forEach(chromosome => {
        //chromosome.getFitness();
        chromosome.getFitness();
    });

    let nextGenChromosomes = new Array();

    // Select and crossover next generation
    for (let generation = 0; generation < this.population; generation+=2) {
        nextChromosome1 = this.selection();
        nextChromosome2 = this.selection();
        nextChromosome1.crossover(nextChromosome2);
        nextChromosome1.mutate(this.mutateFactor);
        nextChromosome2.mutate(this.mutateFactor);
        nextGenChromosomes.push(nextChromosome1, nextChromosome2);
    }

    // Set the next generation of chromosomes as the current ones
    this.chromosomes = nextGenChromosomes;
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