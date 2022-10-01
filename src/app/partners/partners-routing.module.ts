import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerTableComponent } from './components/partner-table/partner-table.component';
import { PartnersResolver } from './services/partner.resolver';

const routes: Routes = [
  {
    path: '',
    component: PartnerTableComponent,
    resolve: {
        courses: PartnersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
