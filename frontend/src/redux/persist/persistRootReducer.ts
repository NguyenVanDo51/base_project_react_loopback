import { AnyAction } from 'redux';
import { UserType } from '../../contants/Types';
import { Change_User } from '../dispatchAction';

export type PersistReducerType = {
  user?: UserType;
}

const initialState: PersistReducerType = {
  user: undefined,
};

function persistReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case Change_User:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return { ...state };
  }
}

export default persistReducer;
