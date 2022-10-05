import {Injectable} from '@angular/core';
import {DefaultDataService, HttpUrlGenerator} from '@ngrx/data';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { getApiNamespace } from 'src/app/utils/http';


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

    add(partner: Partial<PartnerExtended>): Observable<PartnerExtended> {
        // super.add(partner);
        return this.http.post<PartnerExtended>(`/${getApiNamespace()}/partner`, {partner: {...partner}}).pipe(
            map((response) => response.partner)
        );
    }

    /**
     * Override update method in order to align with MirageJS RestSerializer
     *
     */
    update({id, changes}: {id: string, changes: PartnerExtended}): Observable<PartnerExtended> {
        // TODO: Avoid namespace with an interceptor
        return this.http.put<PartnerExtended>(`/${getApiNamespace()}/partner/${id}`, {partner: {...changes}});
    }

    getById(id: string | number): Observable<PartnerExtended> {
        return this.http.get<PartnerExtended>(`/${getApiNamespace()}/partner/${id}`).pipe(
            map((response) => response.partner)
        );
    }

}