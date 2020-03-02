function ChessGenetic(geneSize, population, mutFactor) {
    this.geneSize = geneSize;
    this.population = population;
    this.mutateFactor = mutFactor;
    this.chromosomes = new Array(this.population);
    
    for (let index = 0; index < this.chromosomes.length; index++) {
        this.chromosomes[index] = new Chromosome(this.geneSize);
        this.chromosomes[index].initalize();
    }
}

// Select parents from current generation using Roulette Wheel Selection
ChessGenetic.prototype.selection = function() {
    let nonConflictSum = 0;
    let partialSum = 0;
    let rand = 0;
    let selectedChromosome;

    // Sum up the non-conflict pairs of each chromosome
    this.chromosomes.forEach(chromosome => {
        nonConflictSum += chromosome.nonConflict;
    });
    
    // Select next generation of parent chromosomes
    rand = Math.random(); // Pick between 0 and 1

    for (let i = 0; i < this.population; i++) {
        partialSum += (this.chromosomes[i].nonConflict / nonConflictSum);
    
        if (partialSum >= rand) {
            selectedChromosome = this.chromosomes[i];
            break;
        }
            
    }

    // Return the selected parent
    return selectedChromosome
}

// Run one iteration of the genetic algorithm
ChessGenetic.prototype.step = function() {
    console.log(this.chromosomes);
    let nextGenChromosomes = new Array();

    // Select, crossover, and mutate the next generation
    for (let generation = 0; generation < this.population; generation+=2) {
        nextChromosome1 = this.selection();
        nextChromosome2 = this.selection();
        nextChromosome1.crossover(nextChromosome2);
        nextChromosome1.mutate(this.mutateFactor);
        nextChromosome2.mutate(this.mutateFactor);
        nextChromosome1.getFitness();
        nextChromosome2.getFitness();
        nextGenChromosomes.push(nextChromosome1, nextChromosome2);
    }
    
    // Set the next generation of chromosomes as the current ones
    this.chromosomes = nextGenChromosomes;
}

// Return the chromosome with the highest fitness
ChessGenetic.prototype.getBestChromosome = function() {
    let bestChromosome = new Chromosome(this.geneSize);

    this.chromosomes.forEach(chromosome => {
        if (chromosome.fitness >= bestChromosome.fitness) {
            bestChromosome = chromosome;
        }
    });

    return bestChromosome;
}