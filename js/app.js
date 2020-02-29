var chessboard = new ChessGraph('myBoard');
var position = {
    d6: 'wQ',
    d4: 'wQ',
    e4: 'wQ'
  };

chessboard.setQueens(position);

function startGen(event) {
  const GENO_SIZE = 6;
  let population = parseInt(document.getElementById('input-chromo').value);
  let mutation = parseFloat(document.getElementById('input-mut').value);
  let maxGen = parseInt(document.getElementById('input-cut').value);

  let queenProblem = new ChessGenetic(GENO_SIZE, population);
  
  event.preventDefault();
}

const form = document.getElementById('form-gen');
form.addEventListener('submit', startGen);