import { Course } from "../model/course";
import { EntityState } from "@ngrx/entity";

// naive approach: use EntityState instead:
// https://ngrx.io/guide/entity/interfaces

// export interface CoursesState {
//   entities: {[key:number]: Course},
//   ids: number[]
// }

// using EntityState
export interface CoursesState extends EntityState<Course>{

}

