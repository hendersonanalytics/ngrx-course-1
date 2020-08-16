import { Course } from "../model/course";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../course/action-types";

// naive approach: use EntityState instead:
// https://ngrx.io/guide/entity/interfaces

// export interface CoursesState {
//   entities: {[key:number]: Course},
//   ids: number[]
// }

// using EntityState
export interface CoursesState extends EntityState<Course>{

}

const adapter = createEntityAdapter<Course>();

const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) => {
    return adapter.addAll(action.courses, state);
  })
);
