import {createSelector} from '@ngrx/store';

// createSelector function has memory; only runs if the input has changed
export const isLoggedIn = createSelector(
  state => state['auth'],
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
