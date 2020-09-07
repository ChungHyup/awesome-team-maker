import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';

const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default() => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
  let persistor = persistStore(store);

  return { store, persistor }
}
