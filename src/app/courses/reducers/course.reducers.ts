import { Course } from "../model/course";
import { EntityState } from "@ngrx/entity";
import { CoursesHttpService } from "../services/courses-http.service";

// naive approach: use EntityState instead:
// https://ngrx.io/guide/entity/interfaces
// export interface CoursesState {
//   entities: {[key:number]: Course},
//   ids: number[]
// }

export interface CoursesState extends EntityState<Course>{

}

