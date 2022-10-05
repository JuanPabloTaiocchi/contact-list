import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { MenuWrapperComponent } from 'src/app/pagination/components/menu-wrapper/menu-wrapper.component';
import { PaginationResponse } from 'src/app/pagination/interfaces/pagination-response.interface';
import { getApiNamespace, getHttpErrorMessage } from 'src/app/utils/http';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { PartnerCrudService } from '../../services/partner-crud.service';
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
  ) { }

  ngAfterViewInit(): void {
    this.preparePaginationMechanism();
  }

  openModal(){
    this.getModalConfiguration();
  }

  /**
   * Open edit bootstrap modal.
   * @param partnerId: id of the partner to be edited.
   */
  onEdit(partnerId: string): void{
    const modalRef: NgbModalRef = this.getModalConfiguration();
    modalRef.componentInstance.partnerId = partnerId;
  }

  getModalConfiguration(): NgbModalRef{
    const modalRef = this.modalService.open(
      UpsertPartnerComponent,
      {size: 'lg'}
    );
    modalRef.componentInstance.partnerCrudService = this.partnerCrudService;
    modalRef.componentInstance.fb = this.formBuilder;
    modalRef.result.then(() => this.handleSuccessOperation());
    return modalRef;
  }

  startLoading(isLoading: true): void{
    this.loading = isLoading;
  }

  getHttpParameters(
    offset: number, limit: number, value: string, otherPropertyObj: {nOrdine: number}): string{
    const searchParam = value || '';
    return `/${getApiNamespace()}/partners?offset=${offset}&limit=${limit}`;
  }

  preparePaginationMechanism(){
    this.menuWrapper.getSubject().subscribe((response: PaginationResponse) => {
      this.partners = response.partners;
      this.loading = false;
    });
    this.menuWrapper.pushNewQueryWrapper(true);
  }

  onCancel(partnerId: string): void{
    this.partnerCrudService.delete(partnerId).pipe(
      first()
    ).subscribe(
      () => this.handleSuccessOperation(),
      (e: unknown) => console.log(getHttpErrorMessage(e))
    );
  }

  /**
   * Handle Modal Closing
   */
  handleSuccessOperation(): void{
    // TODO: Write a generic modal in order to ask for a confirmation of canceling or not
    this.menuWrapper.pushNewQueryWrapper(true);
  }  

}
