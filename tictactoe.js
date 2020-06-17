// function takes in an array of 'x', 'o', or '' characters
// eg:
//   [['', 'x', 'o'],
//    ['o', 'x', 'x'],
//    ['o', 'x', '']]

// let board = [['', '', 'o'],['x','x','x'],['o','x','']];
// let board = [['x','o',''],['x','o','x'],['','o','']]
// let board = [['x','o',''],['o','x','x'],['o','o','x']]
// let board = [['','o','x'],['o','x','x'],['x','o','o']]
let board = [['o','x','o','x'],['x','o','x','x'],['x','o','o',''],['','x','x','o']]
checkWin(board);

function checkWin(gameboard) {
  // check rows
  let hasWinner = checkArrayForWin(gameboard) 

  if (!hasWinner) {
    // check columns
    let rotatedBoard = rotateBoard(gameboard);
    hasWinner = checkArrayForWin(rotatedBoard);
  }

  if (!hasWinner) {
    // check cross pattern
    let crossBoard = getDiagonals(gameboard);
    hasWinner = checkArrayForWin(crossBoard);
  }

  if (!hasWinner) {
    console.log('No winner found.');
  }
}

function getDiagonals(gameboard) {
  let crossArrays = [[],[]];
  let rowLength = gameboard.length;

  // get from top left to bottom right
  for (let i = 0; i < rowLength; i++) {
    crossArrays[0].push(gameboard[i][i]);
  }

  // get from top right to bottom left
  for (let i = 0; i < rowLength; i++) {
    crossArrays[1].push(gameboard[i][(rowLength - 1) - i]);
  }

  return crossArrays;
}

// rotate board to reuse the checkArrayForWin method
function rotateBoard(gameboard) {
  let rotated = [];

  // create an array in rotated for all of the columns in the gameboard array
  for(let i = 0; i < gameboard.length; i++){
      rotated.push([]);
  };

  // go through each row and put them on the new board rotated from where they were
  for(let i = 0; i < gameboard.length; i++){
      for(let j = 0; j < gameboard.length; j++){
          rotated[j].push(gameboard[i][j]);
      };
  };

  return rotated;
}

function checkArrayForWin(gameboard) {
  let winCharacter = '';

  // for each row, check if any rows are all unique character
  gameboard.forEach(row => {
    let uniquified = row.filter(onlyUnique);
    let unique = uniquified[0];
    // if a row has only x's or y's, it's a win
    if (uniquified.length == 1 && (unique == 'x' || unique == 'o')) {
      winCharacter = unique;
    }
  });

  // check for a winner
  if (winCharacter != '') {
    console.log(winCharacter + ' wins');
    return true;
  }

  return false;
}

// return an array with only unique values
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
