function Chromosome(genoSize) {
    this.fitness = 0;
    this.genes = new Array(genoSize);
    this.nonConflict = 0;
}

// Populate the geno to have 0s and 1s
Chromosome.prototype.initalize = function() {
    for (let index = 0; index < this.genes.length; index++) {
        Math.random() > 0.5 ? this.genes[index] = 1 : this.genes[index] = 0;   
        // Evaluate the fitness of the inital chromosome
        this.getFitness();
    }
}

// Convert the genes binary to decimal
Chromosome.prototype.binaryToDec = function() {
    let decimalGenes = [];

    for (let index = 0; index < this.genes.length; index+=3) {
        let decimal = this.genes[index] * 4 + this.genes[index+1] * 2 + this.genes[index+2] * 1;
        decimalGenes.push(decimal);
    }

    return decimalGenes;
}

Chromosome.prototype.getFitness = function() {
    let conflicts = 0;
    let numOfQueens = 8;
    // Array of the coordanates of the queens index=>colom | element=>row
    let queenArray = new Array(); 

    queenArray = this.binaryToDec();

    // Iterates through array of queens, countes how many queens on each row and diagonals
    // Queens on n-slope diagonals have the same sum of column + row num (i + x)
    // Queens on p-slope diagonals have same sum of column (i) + inverted row (numOfQueens-1 - x)
    let q_row = new Array(numOfQueens*2).fill(0);
    let q_ndiag = new Array(numOfQueens*2).fill(0);
    let q_pdiag = new Array(numOfQueens*2).fill(0);

    for (let i = 0; i < numOfQueens; i++) {
        let x = queenArray[i];
        q_row[x]++; // Counter for rows
        q_ndiag[x + i]++; // Counter for negative slope diagonals
        q_pdiag[numOfQueens - 1 - x + i]++; // Counter for positive slope diagonals
    }
    // (X * (X-1)) / 2 = number of conflicts per straight line (row / diagonal)
    // Counts conflicts based on num of queens per row
    // Iterates numOfQueens*2 because diagonals can be stored up to value of 14
    for (let i = 0; i < numOfQueens*2; i++) {
        conflicts += ((q_row[i] * (q_row[i] - 1)) / 2);
        conflicts += ((q_ndiag[i] * (q_ndiag[i] - 1)) / 2);
        conflicts += ((q_pdiag[i] * (q_pdiag[i] - 1)) / 2);
    }
    this.nonConflict = 28 - conflicts; // Number of non-conflict pairs in the chromosome
    this.fitness = 1-(conflicts/28); // 28 is maximum number of conflicts, inverse so higher fitness = less conflict percentage
}

// One point crossover with two parent chromosomes
Chromosome.prototype.crossover = function(otherChromo) {
    let crossPoint = Math.round(Math.random()*(this.genes.length/3))*3;
    let offspring1 = this.genes.slice(0, crossPoint);
    let offspring2 = otherChromo.genes.slice(0, crossPoint);
    
    offspring1 = offspring1.concat(otherChromo.genes.slice(crossPoint));
    offspring2 = offspring2.concat(this.genes.slice(crossPoint));
    // Set the parent chromosome to the new offsprings
    this.genes = offspring1;
    otherChromo.genes = offspring2;
}

// Mutation of the genes
Chromosome.prototype.mutate = function(mutFactor) {
    for (let index = 0; index < this.genes.length; index++) {
        if (Math.random() < mutFactor) { // Number between 0 and 1
            this.genes[index] = 1 - this.genes[index];
        }
    }
}