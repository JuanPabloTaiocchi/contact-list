import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerCrudService } from '../../services/partner-crud.service';
import { UpsertPartnerComponent } from '../upsert-partner/upsert-partner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private partnerCrudService: PartnerCrudService
  ) { }

  ngOnInit(): void {
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

}
