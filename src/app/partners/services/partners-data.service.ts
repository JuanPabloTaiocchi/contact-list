import {Injectable} from '@angular/core';
import {DefaultDataService, HttpUrlGenerator} from '@ngrx/data';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { crudInterface } from 'src/app/interfaces/crud-service.interface';



@Injectable()
export class PartnersDataService extends DefaultDataService<PartnerExtended>{

    constructor(http:HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Partner', http, httpUrlGenerator);
    }

    getAll(): Observable<PartnerExtended[]> {
        return this.http.get('/api/partners')
        .pipe(
            map((res: any) => res['partners'])
        );
    }

}