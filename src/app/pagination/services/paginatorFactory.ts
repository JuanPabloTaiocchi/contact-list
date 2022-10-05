import {HttpPaginator} from './httpPaginator';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modality } from '../interfaces/modality.interface';
import { Paginator } from '../interfaces/paginator.interface';


/**
 * This is the class factory that creates the paginator based on the modality parameter.
 * if I want use another modality, I have to create a new class that implements the Paginator interface
 * @example
 * getInstance(paginatorType: Modality): Paginator{
 *   if (paginatorType === Modality.sqlite){ return new SqlPaginator(); }
 *   if (paginatorType === Modality.firebase){ return new FirebasePaginator(); }
 * }
 * {@link https://refactoring.guru/design-patterns/factory-method}
 */
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
