import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import persistRootReducer, { PersistReducerType } from './persist/persistRootReducer';

import rootReducer, { RootReducerType } from './reducers/rootReducer';

export type RootStateType = {
  rootReducer: RootReducerType,
  persistReducer: PersistReducerType,
};

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, persistRootReducer);

const store = configureStore({
  reducer: { rootReducer, persistReducer: persistedReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export const persistor = persistStore(store);

export default store;
