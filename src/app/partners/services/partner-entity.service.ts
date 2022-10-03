import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Observable, of } from "rxjs";
import { first, map, mergeMap } from "rxjs/operators";
import { crudInterface } from "src/app/interfaces/crud-service.interface";
import { PartnerExtended } from "src/models/PartnerExtended.model";

@Injectable()
export class PartnerEntityService extends EntityCollectionServiceBase<PartnerExtended> 
  implements crudInterface<PartnerExtended> {
  constructor(serviceElementsFacory: EntityCollectionServiceElementsFactory){
    super('Partner', serviceElementsFacory);
  };

  readAll(): Observable<PartnerExtended[]> {
    return this.entities$;
  }

  public getEntity(partnerId: string): Observable<PartnerExtended> {
    return this.entities$.pipe(
      first(),
      map((partners: PartnerExtended[]) => partners.find((partner: PartnerExtended) => partner.id === partnerId)),
      mergeMap((partnerFinded: PartnerExtended | undefined) => {
        if(partnerFinded){ return of(partnerFinded); }
        return this.getByKey(partnerId);
      })
    );
  }

}