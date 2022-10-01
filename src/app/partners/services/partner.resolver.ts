import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { PartnerEntityService } from "./partner-entity.service";
import { filter, first, map, tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable()
export class PartnersResolver implements Resolve<boolean>{
  constructor(private partnerEntityService: PartnerEntityService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.partnerEntityService.loaded$.pipe(
      tap((loaded) => {
        if(loaded){ return; }
        this.partnerEntityService.getAll();  
      }),
      filter(loaded => !!loaded),
      first()
    )
  }
}