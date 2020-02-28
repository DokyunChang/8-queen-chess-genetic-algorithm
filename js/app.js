var chessboard = new ChessGraph('myBoard');
var position = {
    d6: 'wQ',
    d4: 'wQ',
    e4: 'wQ'
  };

chessboard.setQueens(position);

function startGen(event) {
  let chromoNum = document.getElementById('input-chromo').value;
  let mutation = document.getElementById('input-mut').value;
  let maxGen = document.getElementById('input-cut').value;

  console.log(chromoNum, mutation, maxGen);
  event.preventDefault();
}

const form = document.getElementById('form-gen');
form.addEventListener('submit', startGen);