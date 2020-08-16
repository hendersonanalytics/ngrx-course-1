import { Course, compareCourses } from "../model/course";
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

const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  // selectId: (course) => course.id -- we'd need to use this if the id field wasn't called 'id'
});

const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) => {
    return adapter.addAll(action.courses, state);
  })
);

export const { selectAll } = adapter.getSelectors();
