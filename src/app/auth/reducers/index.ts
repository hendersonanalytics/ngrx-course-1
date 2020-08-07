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

export interface AuthState {

}

const initialAuthState: AuthState = {
  user: undefined
}

export const  authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    };
  })
);
