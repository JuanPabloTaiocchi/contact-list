import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MenuWrapperComponent } from './components/menu-wrapper/menu-wrapper.component';
import { PaginationRoutingModule } from './pagination-routing.module';
import { HttpPaginator } from './services/httpPaginator';
import { PaginatorFactory } from './services/paginatorFactory';



@NgModule({
  declarations: [
    MenuComponent,
    MenuWrapperComponent
  ],
  imports: [
    CommonModule,
    PaginationRoutingModule
  ],
  providers: [
    PaginatorFactory
  ],
  exports: [
    MenuWrapperComponent,
    MenuComponent
  ]
})
export class PaginationModule { }
