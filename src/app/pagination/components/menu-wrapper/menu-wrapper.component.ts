import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Modality } from '../../interfaces/modality.interface';
import { PaginationResponse } from '../../interfaces/pagination-response.interface';
import { Paginator } from '../../interfaces/paginator.interface';
import { Query } from '../../interfaces/query.interface';
import { PaginatorFactory } from '../../services/paginatorFactory';
import { ScrollOptions } from '../../interfaces/scroll-options.interface';


/**
 * Fetch Wrapper.
 * @Input modality: it could be http, sql, cache.... If nothing is provided, it will use http
 * @Input loading: boolean to show a spinner/ set button css disable property
 * @Input getParameters: function that returns string parameters to be added to the url
 * @example
 * http://url.it/api/entityName?offset=${offset}&limit=${limit}
 * @Input otherPropertyObj
 * @Output startedFething: emitter that emits when the fetch starts
 */
@Component({
  selector: 'app-menu-wrapper',
  templateUrl: './menu-wrapper.component.html',
  styleUrls: ['./menu-wrapper.component.css']
})
export class MenuWrapperComponent {
  @Input() modality?: Modality;
  @Input() loading!: boolean;
  @Input() getParameters!: (offset: number, limit: number, serchValue: string, otherPropertyObj?: any) => string;
  @Output() startedFething = new EventEmitter<true>();
  searchValue: string = '';
  offset: number = 0;
  limit: number = 10;
  options: ScrollOptions;
  private queriesSubject: Subject<Query>;
  paginator: Paginator;


  constructor(
    private paginatorCreator: PaginatorFactory
  ) {
    this.modality = this.modality ?? Modality.http;
    this.queriesSubject = new Subject<Query>();
    this.paginator = this.paginatorCreator.getInstance(this.modality);
    this.options = {
      hasNext: false,
      hasPrevious: false,
      hasMore: false
    };
  }

  /**
   * Return the subject that will do the request for data.
   * It must be initialized within the parent component
   *
   * @return an array of the entities requested
   * @example
   * // Inizializzazione con gestione a valle del risultato ottenuto
   * this.PaginationPage.getSubject().pipe(
   *   ... // do something
   * ).subscribe((response: PaginationResponse) => this.handleReadingEntitiesResponse(response));
   */
  public getSubject(): Observable<PaginationResponse>{
    return this.paginator.get(this.queriesSubject).pipe(
      map((response: PaginationResponse) => {
        this.setPaginationSetup(response);
        return response;
      }),
    );
  }

  previous(): void {
    this.offset -= this.limit;
    this.pushNewQuery(true, this.searchValue);
  }

  next(): void {
    this.offset += this.limit;
    this.pushNewQuery(true, this.searchValue);
  }

  refresh(){
    this.searchValue = '';
    this.offset = 0;
    this.pushNewQuery(true);
  }

  private pushNewQuery(refresh: boolean, searchValue = '', fromIntent = false){
    this.searchValue = searchValue;
    this.startedFething.emit(true);
    this.queriesSubject.next({
      offset: this.offset,
      limit: this.limit,
      refresh,
      url: this.getFetchSource(searchValue, fromIntent),
    });
  }

  public pushNewQueryWrapper(refresh: boolean, searchValue = '', fromIntent = false): void{
    if (refresh){ this.offset = 0; }
    this.pushNewQuery(refresh, searchValue, fromIntent);
  }

  getFetchSource(searchValue: string, fromIntent = false): string {
    return this.getParameters(this.offset, this.limit, searchValue);
  }

  /**
   * Set 'options' based on  the response fro cloud/sql/cache....
   * @param response: the response from cloud/sql/cache
   */
  private setPaginationSetup(response: PaginationResponse): void{
    this.options = {
      hasNext: response.hasMore,
      hasPrevious: this.offset > 0,
      totalResults: response.totalResults,
      hasMore: response.hasMore
    };
}

}
