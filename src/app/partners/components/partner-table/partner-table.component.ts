import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { getPartnerString } from '../../../../models/PartnerExtended.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerCrudService } from '../../services/partner-crud.service';
import { FormBuilder } from '@angular/forms';


/**
 * This components only render a partner list and trigger emitter for cancel and update events (it's a slave component).
 * @Input partners: partners to be rendered
 * @Output onCancel: cancel partner event emitter
 * @Output onEdit: edit partner event emitter
 */
@Component({
  selector: 'app-partner-table',
  templateUrl: './partner-table.component.html',
  styleUrls: ['./partner-table.component.css']
})
export class PartnerTableComponent {
  @Input() partners: PartnerExtended[] | undefined;
  @Output() onCancel = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<string>();
  getPartnerStringFn: (partner: PartnerExtended) => string = getPartnerString; // used within template, DON'T REMOVE ME!

  constructor(
    private modalService: NgbModal,
    private partnerCrudService: PartnerCrudService,
    private formBuilder: FormBuilder
  ) { }

  /**
   * Trigger the edit event emitter
   * @param partnerId: id of the partner to be edited.
   */
  openEditPartnerModal(partnerId: string): void{
    this.onEdit.emit(partnerId);
  }

  /**
   * Trigger the cancel event emitter
   * @param partnerId: id of the partner to be edited.
   */
  openCancelPartnerModal(partnerId: string): void{
    this.onCancel.emit(partnerId);
  }

}
