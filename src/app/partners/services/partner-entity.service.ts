import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Observable } from "rxjs";
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

}