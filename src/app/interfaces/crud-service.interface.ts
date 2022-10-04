import { Observable } from "rxjs";

/**
 * string | number because it might adapt to all entity types, not only for Partners
 */
export interface crudInterface<EntityType>{
  readAll(): Observable<EntityType[]>,
  get(id: string | number): Observable<EntityType>,
  create(data: EntityType): Observable<EntityType>,
  update(data: EntityType): Observable<EntityType>,
  delete(id: string | number): Observable<string | number>,
}