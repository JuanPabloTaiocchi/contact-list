import {HttpPaginator} from './httpPaginator';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modality } from '../interfaces/modality.interface';
import { Paginator } from '../interfaces/paginator.interface';


@Injectable()
export class PaginatorFactory{

    constructor(
        private http: HttpClient
    ){}

    getInstance(paginatorType?: Modality): Paginator{
        if (paginatorType === Modality.http){ return new HttpPaginator(this.http); }
        return new HttpPaginator(this.http);
    }
}
