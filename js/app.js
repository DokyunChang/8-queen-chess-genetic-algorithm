var chessboard = new ChessGraph('myBoard'); // Chessboard graphic object
var queenProblem; // Genetic Algorithm object
var historicalBest = 0;

// Convert the decimal coordinates of queens into coordinates the chessboard object understands
function setPositions(coordinates) {
  let positions = {};

  positions['a'+ (coordinates[0]+1).toString()] = 'wQ';
  positions['b'+ (coordinates[1]+1).toString()] = 'wQ';
  positions['c'+ (coordinates[2]+1).toString()] = 'wQ';
  positions['d'+ (coordinates[3]+1).toString()] = 'wQ';
  positions['e'+ (coordinates[4]+1).toString()] = 'wQ';
  positions['f'+ (coordinates[5]+1).toString()] = 'wQ';
  positions['g'+ (coordinates[6]+1).toString()] = 'wQ';
  positions['h'+ (coordinates[7]+1).toString()] = 'wQ';

  return positions
}

// Output the current generation and fiteness of the best chromosome to the front-end
function display(curGeneration, bestFitness) {
  document.getElementById('gen').innerHTML = 'Generation: ' + curGeneration;
  document.getElementById('best-fit').innerHTML = 'Best Fit Function: ' + bestFitness;
}

// Loop for each generation
function genLoop (curGeneration, maxGen) {    
  setTimeout(function () {  
    curGeneration++;   
    queenProblem.step();
    bestChromosome = queenProblem.getBestChromosome();
    if (bestChromosome.fitness.toFixed(3) > historicalBest) {
      historicalBest = bestChromosome.fitness.toFixed(3);
      console.log(historicalBest);
      console.log(bestChromosome.genes);
    }
    display(curGeneration, bestChromosome.fitness.toFixed(3))

    let coordinates = bestChromosome.genes;
    let positions = setPositions(coordinates);

    chessboard.setQueens(positions);

    if (curGeneration < maxGen && bestChromosome.fitness != 1) { 
      genLoop(curGeneration, maxGen);          
    }                       
}, 0)
}

// Form submit event listener
function startGen(event) {
  const GENO_SIZE = 8;
  let population = parseInt(document.getElementById('input-chromo').value);
  let mutation = parseFloat(document.getElementById('input-mut').value);
  let maxGen = parseInt(document.getElementById('input-cut').value);
  let curGeneration = 0;
  
  queenProblem = new ChessGenetic(GENO_SIZE, population, mutation);
  genLoop(curGeneration, maxGen);
  event.preventDefault(); // Prevent the default behaviour of the form tag 
}

// Create the submit event
const form = document.getElementById('form-gen');
form.addEventListener('submit', startGen);