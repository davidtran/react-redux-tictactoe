import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board/Board';
import { Provider } from 'react-redux';
import store from './redux/createStore';

ReactDOM.render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById('root')
);
