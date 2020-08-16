import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router"
import { Observable, of } from "rxjs"
import { AppState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { loadAllCourses, allCoursesLoaded } from "./course.actions";
import { tap, first, finalize, filter } from "rxjs/operators";
import { selectCoursesState, selectAllCoursesLoaded } from "../courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  private _isLoading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
      return this.store.pipe(
        select(selectAllCoursesLoaded),
        tap((allCoursesLoaded) => {
          if (!allCoursesLoaded && this._isLoading === false) {
            this._isLoading = true;
            this.store.dispatch(loadAllCourses());
          }
        }),
        filter((allCoursesLoaded) => allCoursesLoaded), // needed so that the first value is only taken after all courses have been loaded
        first(),
        finalize(() => {
          this._isLoading = false;
        })
      )
  }
}
