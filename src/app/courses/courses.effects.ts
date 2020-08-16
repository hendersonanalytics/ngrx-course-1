import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { CoursesHttpService } from "./services/courses-http.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./course/action-types";
import { concatMap, map } from "rxjs/operators";
import { allCoursesLoaded } from "./course/course.actions";

@Injectable()
export class CoursesEffects {
  public loadCourses$: Observable<Action>;

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {
    this.createLoadCoursesEffect();
  }

  createLoadCoursesEffect(): void {
    this.loadCourses$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.loadAllCourses),
        concatMap((action) => this.coursesHttpService.findAllCourses()),
        map((courses) => allCoursesLoaded({courses}))
      );
    });
  }
}
