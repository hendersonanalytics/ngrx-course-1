import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router"
import { Observable, of } from "rxjs"
import { AppState } from "../../reducers";
import { Store } from "@ngrx/store";
import { loadAllCourses } from "./course.actions";
import { tap, first, finalize } from "rxjs/operators";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  private _isLoading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
      return this.store.pipe(
        tap(() => {
          if (this._isLoading === false) {
            this._isLoading = true;
            this.store.dispatch(loadAllCourses());
          }
        }),
        first(),
        finalize(() => {
          this._isLoading = false;
        })
      )
  }
}
