import {Injectable} from '@angular/core';
import {DefaultDataService, HttpUrlGenerator} from '@ngrx/data';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { PartnerExtended } from 'src/models/PartnerExtended.model';


@Injectable()
export class PartnersDataService extends DefaultDataService<PartnerExtended>{

    constructor(http:HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Partner', http, httpUrlGenerator);
    }

    getAll(): Observable<PartnerExtended[]> {
        return super.getAll().pipe(
            map((response: any) => response.partners)
        );
    }

    add(partner: PartnerExtended): Observable<PartnerExtended> {
        return super.add(partner).pipe(
            tap((response: any) => console.log(response))
        );
    }

    /**
     * Override update method in order to align with MirageJS RestSerializer
     *
     */
    update({id, changes}: {id: string, changes: PartnerExtended}): Observable<PartnerExtended> {
        // TODO: Avoid namespace with an interceptor
        return this.http.put<PartnerExtended>(`/api/partner/${id}`, {partner: {...changes}});
    }

}