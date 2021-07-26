import { AnyAction } from 'redux';
import { ProjectType, UserType } from '../../contants/Types';
import { Change_Project_List, Change_User } from '../dispatchAction';

export type RootReducerType = {
  projects: ProjectType[];
}

const initialState: RootReducerType = {
  projects: [],
};

function rootReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case Change_Project_List:
      return {
        ...state,
        projects: action.payload,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
