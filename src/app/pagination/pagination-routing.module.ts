import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuWrapperComponent } from './components/menu-wrapper/menu-wrapper.component';


const routes: Routes = [
  {
    path: '',
    component: MenuWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginationRoutingModule {}
