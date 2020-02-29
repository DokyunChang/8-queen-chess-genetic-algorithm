var chessboard = new ChessGraph('myBoard');
var position = {
    d6: 'wQ',
    d4: 'wQ',
    e4: 'wQ'
  };

chessboard.setQueens(position);

function startGen(event) {
  let chromoNum = parseInt(document.getElementById('input-chromo').value);
  let mutation = parseFloat(document.getElementById('input-mut').value);
  let maxGen = parseInt(document.getElementById('input-cut').value);

  let dna1 = new DNA(chromoNum);
  let dna2 = new DNA(chromoNum);
  dna1.initalize();
  dna2.initalize();
  //dna1.crossOver(dna2);
  console.log(dna1.geno);
  dna1.mutate(mutation);
  console.log(dna1.geno,'\n');
  event.preventDefault();
}

const form = document.getElementById('form-gen');
form.addEventListener('submit', startGen);