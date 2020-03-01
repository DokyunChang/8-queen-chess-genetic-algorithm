var chessboard = new ChessGraph('myBoard');
var queenProblem;

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


function display(curGeneration, bestFitness) {
  document.getElementById('gen').innerHTML = 'Generation: ' + curGeneration;
  document.getElementById('best-fit').innerHTML = 'Best Fit Function: ' + bestFitness;
}

function genLoop (curGeneration, maxGen) {    
  setTimeout(function () {  
    curGeneration++;    
    queenProblem.step();
    bestChromosome = queenProblem.getBestChromosome();
    display(curGeneration, bestChromosome.fitness.toFixed(3))
    let coordinates = bestChromosome.binaryToDec();
    let positions = setPositions(coordinates);
    chessboard.setQueens(positions);

    if (curGeneration < maxGen && curGeneration.fitness != 1) { 
      genLoop(curGeneration, maxGen);          
    }                       
}, 50)
}

function test() {
  let test = queenProblem.getBestChromosome();
  test.setFitness();
  console.log(test);
  let coordinates = test.binaryToDec();
  let positions = setPositions(coordinates);
  chessboard.setQueens(positions);
}

function startGen(event) {
  const GENO_SIZE = 24;
  let population = parseInt(document.getElementById('input-chromo').value);
  let mutation = parseFloat(document.getElementById('input-mut').value);
  let maxGen = parseInt(document.getElementById('input-cut').value);
  let curGeneration = 0;

  queenProblem = new ChessGenetic(GENO_SIZE, population, mutation);
  genLoop(curGeneration, maxGen);
  //test();
  event.preventDefault();
}

const form = document.getElementById('form-gen');
form.addEventListener('submit', startGen);