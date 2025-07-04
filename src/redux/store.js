// store.js
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  timeout: 10000, // 10 seconds timeout
  debug: process.env.NODE_ENV === 'development',
  serialize: true,
  writeFailHandler: err => {
    // eslint-disable-next-line no-console
    console.warn('Redux Persist write failed:', err);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

// Add error handling for persistor
const persistor = persistStore(store, null, () => {
  // eslint-disable-next-line no-console
  console.log('✅ Redux Persist: Rehydration completed');
});

// Handle persist errors
persistor.subscribe(() => {
  const state = persistor.getState();
  if (state.bootstrapped) {
    // eslint-disable-next-line no-console
    console.log('✅ Redux Persist: Bootstrap completed');
  }
});

export { store, persistor };
