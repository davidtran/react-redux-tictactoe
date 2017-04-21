import React, { Component } from 'react';
import Square from '../Square/Square';
import { connect } from 'react-redux';
import { setSquareValueAndChangeActivePlayer, createBoard } from '../../redux/index';
import './Board.css';

class Board extends Component {

  componentDidMount() {
    this.props.createBoard();
  }

  render() {
    let { board, onSquareClick, winner, createBoard } = this.props;

    let winnerText = '';
    if (winner === 'draw') {
      winnerText = 'Draw';
    } else if (winner === 1 || winner === 2) {
      winnerText = 'Player ' + winner + ' won!';
    }

    return (
      <div className="board-wrapper">
        <div className="winnerText">{winnerText}</div>
        <div className="board">
          { board && board.map((value, index) =>
            <Square
              onClick={onSquareClick}
              squareValue={value}
              squareIndex={index}
              key={index}>
            </Square>
          )}


        </div>
        { winner &&
          <div className="btn-play-again" onClick={() => createBoard()}>Play again</div>
        }
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    board: state.board,
    winner: state.winner
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSquareClick: (squareIndex) => dispatch(setSquareValueAndChangeActivePlayer(squareIndex)),
    createBoard: () => dispatch(createBoard())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
