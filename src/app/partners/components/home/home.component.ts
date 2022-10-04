import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuWrapperComponent } from 'src/app/pagination/components/menu-wrapper/menu-wrapper.component';
import { PaginationResponse } from 'src/app/pagination/interfaces/pagination-response.interface';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { PartnerCrudService } from '../../services/partner-crud.service';
import { PartnerEntityService } from '../../services/partner-entity.service';
import { UpsertPartnerComponent } from '../upsert-partner/upsert-partner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  loading = true;
  @ViewChild(MenuWrapperComponent) private menuWrapper!: MenuWrapperComponent;
  partners: PartnerExtended[] | undefined;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private partnerCrudService: PartnerCrudService,
    private partnerEntityService: PartnerEntityService
  ) { }

  ngAfterViewInit(): void {
    this.preparePaginationMechanism();
  }

  openModal(){
    const modalRef = this.modalService.open(
      UpsertPartnerComponent,
      {size: 'lg'}
    );
    modalRef.componentInstance.mode = 'create';
    modalRef.componentInstance.partnerCrudService = this.partnerCrudService;
    modalRef.componentInstance.fb = this.formBuilder;
  }

  startLoading(isLoading: true){
    this.loading = isLoading;
  }

  getHttpParameters(
    offset: number, limit: number, value: string, otherPropertyObj: {nOrdine: number}): string{
    const searchParam = value || '';
    return `/api/partners?offset=${offset}&limit=${limit}`;
  }

  preparePaginationMechanism(){
    // this.partnerEntityService.readAll().pipe(first())
    // .subscribe((partners) => {
    //   this.partners = partners}
    // );
    this.menuWrapper.getSubject().subscribe((response: PaginationResponse) => {
      this.partners = response.partners;
      this.loading = false;
    });
    this.menuWrapper.pushNewQueryWrapper(true);
  }

}
