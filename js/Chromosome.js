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

Chromosome.prototype.getFitness = function() {
    let numOfQueens = 8;
    let queenArray = new Array(numOfQueens);
    let conflicts = 0;

    // Converts binary genome to decimal genome
    for (let i = 1; i < (this.geno.length/3)+1; i++) {
        let binaryValue = "" + this.geno[(i*3)-3] + this.geno[(i*3)-2] + this.geno[(i*3)-1];
        this.queenArray[i-1] = parseInt(binaryValue, 2);
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
