import {createSelector, createFeatureSelector} from '@ngrx/store';
import { AuthState } from './reducers';


export const selectAuthState = createFeatureSelector<AuthState>('auth');

// createSelector function has memory; only runs if the input has changed
export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
