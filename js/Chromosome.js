function Chromosome(genoSize) {
    this.fitness = 0;
    this.genes = new Array(genoSize);
}

// Populate the geno to have 0s and 1s
Chromosome.prototype.initalize = function() {
    for (let index = 0; index < this.genes.length; index++) {
        Math.random() > 0.5 ? this.genes[index] = 1 : this.genes[index] = 0;   
    }
}

// Convert the geno binary to decimal
Chromosome.prototype.binaryToDec = function() {
    let decimalGenes = [];

    for (let index = 0; index < this.genes.length; index+=3) {
        let decimal = this.genes[index] * 4 + this.genes[index+1] * 2 + this.genes[index+2] * 1;
        decimalGenes.push(decimal);
    }

    return decimalGenes;
}

/*
Chromosome.prototype.getFitness = function() {
    let numOfQueens = 8;
    let queenArray = new Array(numOfQueens);
    let conflicts = 0;

    // Converts binary genes to decimal genes
    for (let i = 1; i < (this.genes.length/3)+1; i++) {
        let binaryValue = "" + this.genes[(i*3)-3] + this.genes[(i*3)-2] + this.genes[(i*3)-1];
        queenArray[i-1] = parseInt(binaryValue, 2);
    }

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
    this.fitness = 1-(conflicts/28); // 28 is maximum number of conflicts, inverse so higher fitness = less conflict percentage
}
*/

Chromosome.prototype.setFitness = function() {
    let rowConflicts = 0;
    let diagConflicts = 0;
    let rowCheck = new Array(8).fill(0);
    let binaryGenes = this.binaryToDec();

    // Checking conflicting queens in rows
    for (let gene1 = 0; gene1 < binaryGenes.length; gene1++) {
        for (let gene2 = 0; gene2 < binaryGenes.length; gene2++) {
            if (binaryGenes[gene1] == binaryGenes[gene2] && gene1 != gene2) {
                rowConflicts++;
            }
        }
    }
    
    // Checking conflicting queens in diagonal
    for (let gene1 = 0; gene1 < binaryGenes.length; gene1++) {
        for (let gene2 = 0; gene2 < binaryGenes.length; gene2++) {
            let x = Math.abs(gene1 - gene2);
            let y = Math.abs(binaryGenes[gene1] - binaryGenes[gene2]);

            if (x == y && gene1 != gene2) {
                diagConflicts ++;
            }
        }
    }

    let totalConflicts = rowConflicts + diagConflicts;
    // Set fitness for this chromosome
    this.fitness = 1 - (totalConflicts/56); // 56 is the maximum number of conflicts that can accour in the function
}

// One point crossover with two parent Chromosomes
Chromosome.prototype.crossover = function(otherChromo) {
    let crossPoint = Math.round(Math.random()*this.genes.length);
    let offspring1 = this.genes.slice(0, crossPoint);
    let offspring2 = otherChromo.genes.slice(0, crossPoint);
    offspring1 = offspring1.concat(otherChromo.genes.slice(crossPoint));
    offspring2 = offspring2.concat(this.genes.slice(crossPoint));

    // Set offspring to the parent object
    this.genes = offspring1;
    otherChromo.genes = offspring2;
}

// Mutation of the genes
Chromosome.prototype.mutate = function(mutFactor) {
    for (let index = 0; index < this.genes.length; index++) {
        if (Math.random() < mutFactor) {
            this.genes[index] = 1 - this.genes[index];
        }
    }
}