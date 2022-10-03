import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { first, map, mergeMap } from "rxjs/operators";
import { crudInterface } from "src/app/interfaces/crud-service.interface";
import { PartnerExtended } from "src/models/PartnerExtended.model";
import { PartnerEntityService } from "./partner-entity.service";

@Injectable()
export class PartnerCrudService implements crudInterface<PartnerExtended>{
  constructor(
    private partnerEntityService: PartnerEntityService
  ){

  }
  public readAll(): Observable<PartnerExtended[]> {
    return this.partnerEntityService.readAll();
  }

  public getEntity(partnerId: string): Observable<PartnerExtended> {
    return this.partnerEntityService.getEntity(partnerId);
  }
}