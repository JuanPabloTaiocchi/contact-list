import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { crudInterface } from "src/app/interfaces/crud-service.interface";
import { PartnerExtended } from "src/models/PartnerExtended.model";
import { PartnerEntityService } from "./partner-entity.service";


/**
 * For small/medium applications, it's better to use ngrx/data to manage CRUD operations.
 * If you have more data change this service! (DI)
 */
@Injectable()
export class PartnerCrudService implements crudInterface<PartnerExtended>{
  constructor(
    private genericPartnerES: PartnerEntityService
  ){}

  public readAll(): Observable<PartnerExtended[]> {
    return this.genericPartnerES.readAll();
  }

  public get(partnerId: string): Observable<PartnerExtended> {
    return this.genericPartnerES.get(partnerId);
  }

  public create(partner: PartnerExtended): Observable<PartnerExtended> {
    return this.genericPartnerES.create(partner);
  }

  public update(partner: PartnerExtended): Observable<PartnerExtended> {
    return this.genericPartnerES.update(partner);
  }
}