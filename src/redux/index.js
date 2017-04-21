const CREATE_BOARD = 'CREATE_BOARD';
const SET_SQUARE_VALUE = 'SET_SQUARE_VALUE';
const SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER';
const SET_WINNER = 'SET_WINNER';

export function createBoard() {
  return {
    type: CREATE_BOARD
  };
}

export function setSquareValue(squareIndex, playerNumber) {
  return {
    type: SET_SQUARE_VALUE,
    squareIndex,
    playerNumber
  };
}

export function setSquareValueAndChangeActivePlayer(squareIndex) {
  return (dispatch, getState) => {
    let playerNumber = getState().activePlayer;
    let currentBoardValue = getState().board[squareIndex];
    if (currentBoardValue) {
      return;
    }

    dispatch(setSquareValue(squareIndex, playerNumber));
    let nextPlayerNumber = playerNumber;
    if (playerNumber === 1) {
      nextPlayerNumber = 2;
    } else {
      nextPlayerNumber = 1;
    }

    let winner = checkWinner(getState().board);
    if (winner) {
      return dispatch(setWinner(winner));
    } else {
      return dispatch(setActivePlayer(nextPlayerNumber));
    }
  };
}

export function setActivePlayer(playerNumber) {
  return {
    type: SET_ACTIVE_PLAYER,
    playerNumber
  };
}

function setWinner(playerNumber) {
  return {
    type: SET_WINNER,
    playerNumber
  };
}

export default function game(state = {
  board: [],
  activePlayer: null,
  winner: null

}, action) {

  switch (action.type) {
    case CREATE_BOARD:
      return Object.assign({}, state, {
        board: generateBoard(),
        activePlayer: 1,
        winner: null
      });

    case SET_SQUARE_VALUE:
      return Object.assign({}, state, {
        board: state.board.map((square, index) => {
          if (index === action.squareIndex && !square) {
            return action.playerNumber;
          }
          return square;
        })
      });

    case SET_ACTIVE_PLAYER:
      return Object.assign({}, state, {
        activePlayer: action.playerNumber
      });

    case SET_WINNER:
      return Object.assign({}, state, {
        winner: action.playerNumber
      });

    default:
      return state;
  }
}

function generateBoard() {
  let squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push(null);
  }
  return squares;
}

/**
 * Board
 * 0 1 2
 * 3 4 5
 * 6 7 8
 * @param {*} board
 */
function checkWinner(board) {

  let allSquareField = true;
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      allSquareField = false;
      break;
    }
  }

  let winner = isSameValue(board[0], board[1], board[2]) ||
               isSameValue(board[0], board[3], board[6]) ||
               isSameValue(board[0], board[4], board[8]) ||
               isSameValue(board[1], board[4], board[7]) ||
               isSameValue(board[2], board[5], board[8]) ||
               isSameValue(board[2], board[4], board[6]) ||
               isSameValue(board[3], board[4], board[5]) ||
               isSameValue(board[6], board[7], board[8]);

  if (winner !== null) return winner;

  if (null === winner && allSquareField) {
    return 'draw';
  }

  return null;
}

function isSameValue(s1, s2, s3) {
  if (s1 === null || s2 === null || s3 === null) return null;
  if (s1 === s2 && s1 === s3) {
    return s1;
  };
  return null;
}