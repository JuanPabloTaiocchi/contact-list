import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerTableComponent } from './components/partner-table/partner-table.component';
import { UpsertPartnerComponent } from './components/upsert-partner/upsert-partner.component';
import { PartnersResolver } from './services/partners.resolver';

const routes: Routes = [
  {
    path: '',
    component: PartnerTableComponent,
    resolve: {
      courses: PartnersResolver
    }
  },
  {
    path: ':partnerId',
    component: UpsertPartnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
