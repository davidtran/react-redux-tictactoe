import React, { Component } from 'react';
import './Square.css';

export default class Square extends Component {

  render() {
    let { squareValue, onClick, squareIndex } = this.props;
    let squareClassName = 'square';
    if (squareValue) {
      squareClassName += ' square-' + squareValue;
    }
    return (
      <div className={squareClassName} onClick={() => onClick(squareIndex)}></div>
    );
  }
}