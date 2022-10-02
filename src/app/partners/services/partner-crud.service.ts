import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { crudInterface } from "src/app/interfaces/crud-service.interface";
import { PartnerExtended } from "src/models/PartnerExtended.model";
import { PartnerEntityService } from "./partner-entity.service";

@Injectable()
export class partnerCrudService implements crudInterface<PartnerExtended>{
  constructor(
    private partnerEntityService: PartnerEntityService
  ){

  }
  public readAll(): Observable<PartnerExtended[]> {
    return this.partnerEntityService.entities$;
  }
}