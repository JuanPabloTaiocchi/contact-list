import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { PartnerEntityService } from '../../services/partner-entity.service';
import { getPartnerString } from '../../../../models/PartnerExtended.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpsertPartnerComponent } from '../upsert-partner/upsert-partner.component';
import { PartnerCrudService } from '../../services/partner-crud.service';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { getHttpErrorMessage } from 'src/app/utils/http';

@Component({
  selector: 'app-partner-table',
  templateUrl: './partner-table.component.html',
  styleUrls: ['./partner-table.component.css']
})
export class PartnerTableComponent implements OnInit {
  @Input() partners: PartnerExtended[] | undefined;
  @Output() onCancel = new EventEmitter<void>();
  getPartnerStringFn: (partner: PartnerExtended) => string = getPartnerString; // used within template, DON'T REMOVE ME!

  constructor(
    private modalService: NgbModal,
    private partnerCrudService: PartnerCrudService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {}

  /**
   * Open edit bootstrap modal.
   * @param partnerId: id of the partner to be edited.
   */
  openEditPartnerModal(partnerId: string): void{
    const modalRef = this.modalService.open(
      UpsertPartnerComponent,
      {size: 'lg'}
    );
    modalRef.componentInstance.partnerId = partnerId;
    modalRef.componentInstance.mode = 'edit';
    modalRef.componentInstance.partnerCrudService = this.partnerCrudService;
    modalRef.componentInstance.fb = this.formBuilder;
  }

  openCancelPartnerModal(partnerId: string): void{
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
    this.onCancel.emit();
   }

}
