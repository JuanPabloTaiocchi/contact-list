import { Observable, Subject } from 'rxjs';
import { Query } from './query.interface';


export interface Paginator{
    get(queriesSubject: Subject<Query>): Observable<any>;
}
