import { Observable } from "rxjs";

export interface crudInterface<EntityType>{
  readAll(): Observable<EntityType[]>,
  get(id: string | number): Observable<EntityType>,
  create(data: EntityType): Observable<EntityType>,
  update(data: EntityType): Observable<EntityType>,
}