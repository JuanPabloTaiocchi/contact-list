import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCollectionServiceElementsFactory, EntityDataModule, EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { entityMetadata } from './entityMetadata';
import { PartnerEntityService } from './services/partner-entity.service';
import { PartnersResolver } from './services/partner.resolver';
import { PartnerTableComponent } from './components/partner-table/partner-table.component';
import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersDataService } from './services/partners-data.service';



@NgModule({
  declarations: [
    PartnerTableComponent
  ],
  imports: [
    CommonModule,
    PartnersRoutingModule
  ],
  providers: [
    PartnerEntityService,
    PartnersResolver,
    PartnersDataService
  ]
})
export class PartnersModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private partnersDataService: PartnersDataService
  ){
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Partner', partnersDataService);
  }
}
