import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { PartnerEntityService } from '../../services/partner-entity.service';
import { getPartnerString } from '../../../../models/PartnerExtended.model';

@Component({
  selector: 'app-partner-table',
  templateUrl: './partner-table.component.html',
  styleUrls: ['./partner-table.component.css']
})
export class PartnerTableComponent implements OnInit {
  partners$: Observable<PartnerExtended[]> | undefined;
  getPartnerStringFn: (partner: PartnerExtended) => string = getPartnerString; // used within template, DON'T REMOVE ME!

  constructor(
    private partnerEntityService: PartnerEntityService
  ) { }

  ngOnInit(): void {
    this.triggerEvents();
  }

  triggerEvents(){
    this.partners$ = this.partnerEntityService.readAll();
  }

}
