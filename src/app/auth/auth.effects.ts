import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  public login$: Observable<Action>;
  public logout$: Observable<Action>;

  constructor(
    private actions$: Actions,
    private router: Router
    ) {
    this.createLoginEffect();
    this.createLogoutEffect();
  }

  private createLoginEffect() {
    this.login$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.login), // ofType = utility filtering method
        tap((action) => {
          localStorage.setItem('user', JSON.stringify(action.user));
          this.router.navigateByUrl('/courses');
        })
      )
    }, { dispatch: false });
  }

  private createLogoutEffect() {
    this.logout$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      )
    }, { dispatch: false });
  }
}
