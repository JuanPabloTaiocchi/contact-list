import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UpsertPartnerComponent } from './components/upsert-partner/upsert-partner.component';
import { PartnersResolver } from './services/partners.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      courses: PartnersResolver
    }
  },
  {
    path: ':partnerId',
    component: UpsertPartnerComponent
  },
  {
    path: 'create',
    component: UpsertPartnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
