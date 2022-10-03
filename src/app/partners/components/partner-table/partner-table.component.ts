import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { PartnerEntityService } from '../../services/partner-entity.service';
import { getPartnerString } from '../../../../models/PartnerExtended.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpsertPartnerComponent } from '../upsert-partner/upsert-partner.component';
import { PartnerCrudService } from '../../services/partner-crud.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-partner-table',
  templateUrl: './partner-table.component.html',
  styleUrls: ['./partner-table.component.css']
})
export class PartnerTableComponent implements OnInit {
  partners$: Observable<PartnerExtended[]> | undefined;
  getPartnerStringFn: (partner: PartnerExtended) => string = getPartnerString; // used within template, DON'T REMOVE ME!

  constructor(
    private partnerEntityService: PartnerEntityService,
    private modalService: NgbModal,
    private partnerCrudService: PartnerCrudService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.triggerEvents();
  }

  triggerEvents(){
    this.partners$ = this.partnerEntityService.readAll();
  }

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
    
  }

}
