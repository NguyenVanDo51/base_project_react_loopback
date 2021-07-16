import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootReducerType } from './reducers/rootReducer';

export type RootStateType = {
  rootReducer: RootReducerType,
};

export default configureStore({ reducer: { rootReducer } });
