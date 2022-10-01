import { Observable } from "rxjs";

export interface crudInterface<EntityType>{
  readAll(): Observable<EntityType[]>
}