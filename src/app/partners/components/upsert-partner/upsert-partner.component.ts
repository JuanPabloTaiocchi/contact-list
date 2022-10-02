import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Upsert } from 'src/app/interfaces/upsert.interface';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { PartnerCrudService } from '../../services/partner-crud.service';

@Component({
  selector: 'app-upsert-partner',
  templateUrl: './upsert-partner.component.html',
  styleUrls: ['./upsert-partner.component.css']
})
export class UpsertPartnerComponent implements OnInit {
  @Input() partnerId!: string;
  @Input() mode!: Upsert;
  partner$: Observable<PartnerExtended> | undefined;
  formTitle = this.mode === 'create' ? 'Creazione Utente' : 'Modifica Utente';

  constructor(
    private partnerCrudService: PartnerCrudService
  ) { }

  ngOnInit(): void {
    this.triggerEvents();
  }

  triggerEvents(){
    this.partner$ = this.partnerCrudService.getEntity(this.partnerId);
  }

}
