import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityCollectionServiceElementsFactory, EntityDataModule, EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { entityMetadata } from './entityMetadata';
import { PartnerEntityService } from './services/partner-entity.service';
import { PartnersResolver } from './services/partners.resolver';
import { PartnerTableComponent } from './components/partner-table/partner-table.component';
import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersDataService } from './services/partners-data.service';
import { UpsertPartnerComponent } from './components/upsert-partner/upsert-partner.component';
import { PartnerCrudService } from './services/partner-crud.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    PartnerTableComponent,
    UpsertPartnerComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PartnersRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    PartnerEntityService,
    PartnersDataService,
    PartnersResolver,
    PartnerCrudService
  ],
  entryComponents: [
    UpsertPartnerComponent
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
