/* eslint global-require: 0 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../modules/reducer';
import Immutable from 'immutable';

const middlewares = [thunk];

if ('production' !== process.env.NODE_ENV) {
  const createLogger = require('redux-logger');
  const logger = createLogger({
    stateTransformer: (state) => {
      const newState = {};

      for (const i of Object.keys(state)) {
        if (Immutable.Iterable.isIterable(state[i])) {
          newState[i] = state[i].toJS();
        } else {
          newState[i] = state[i];
        }
      }

      return newState;
    },
  });
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(
    rootReducer,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
  );
}
