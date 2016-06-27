import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../modules/reducer';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
