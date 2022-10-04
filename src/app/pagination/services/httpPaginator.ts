import { Observable, Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Paginator } from '../interfaces/paginator.interface';
import { Query } from '../interfaces/query.interface';
import { PaginationResponse } from '../interfaces/pagination-response.interface';


export class HttpPaginator implements Paginator{
    http: HttpClient;

    constructor(http: HttpClient){
        this.http = http;
    }

    /**
     * Inizializza l'observable principale che gestisce la ricerca: in base al campo refresh esegue o meno la ricerca.
     * Va chiamato nel componente utilizzatore.
     * Scatena la chiamata http ed aggiorna hasNext, hasPrevious....
     * Se dentro Query è presente il campo httpBodyParameters, ciò significa che è necessario eseguire una posta invece
     * che una get (esigenza nata per visualizzazione menu ordini).
     * @returns l'observable che deve essere sfruttato dal client che usa questo componente
     */
    get(subject: Subject<Query>): Observable<any>{
        return subject.pipe(
            filter((query: Query) => !!(query.refresh)),
            switchMap((query: Query) => {
                const url = query.url as string;
                return this.http.get<PaginationResponse>(url);
            })
        );
    }
}
