import {createSelector, createFeatureSelector} from '@ngrx/store';
import { CoursesState, selectAll } from './reducers/course.reducers';

import * as fromCourses from './reducers/course.reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter(c => c.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter(c => c.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter(c => c.promo).length
);

export const selectAllCoursesLoaded = createSelector(
  selectCoursesState,
  (courses) => courses.allCoursesLoaded
);
