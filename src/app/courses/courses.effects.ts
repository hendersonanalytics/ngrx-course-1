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
  public saveCourse$: Observable<any>;

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {
    this.createLoadCoursesEffect();
    this.createSaveCourseEffect();
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

  createSaveCourseEffect(): void {
    this.saveCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap((action) => {
          const { update } = action;
          return this.coursesHttpService.saveCourse(update.id, update.changes)
        }),
        // dispatching this action is optional, I did this for shits and giggles
        map(() => CourseActions.courseSaved())
      );
    });
  }
}
