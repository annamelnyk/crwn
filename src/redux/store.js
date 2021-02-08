import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [];

if (process.env.NODE_ENV === 'development') { // allow to log data to console ONLY in 'development' mode
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  store,
  persistStore,
};
