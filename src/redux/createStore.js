import { createStore, applyMiddleware } from 'redux';
import reducer from './index';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();
const store = createStore(
  reducer,
  {},
  applyMiddleware(
    thunk,
    logger
));

export default store;