import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';

import {AuthActions} from '../action-types';
import { User } from '../model/user.model';

export interface AuthState {
  user: User
}

const initialAuthState: AuthState = {
  user: undefined
}

export const  authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    state.user = action.user;
    return {
      user: state.user
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    };
  })
);
