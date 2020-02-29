function ChessGenetic(genoSize, population) {
    this.genoSize = genoSize;
    this.chromosomes = new Array(population);

    for (let index = 0; index < this.chromosomes.length; index++) {
        this.chromosomes[index] = new Chromosome(this.genoSize);
        this.chromosomes[index].initalize();
    }
    console.log(this.chromosomes);
}