import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Upsert } from 'src/app/interfaces/upsert.interface';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { PartnerCrudService } from '../../services/partner-crud.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-upsert-partner',
  templateUrl: './upsert-partner.component.html',
  styleUrls: ['./upsert-partner.component.css']
})
export class UpsertPartnerComponent implements OnInit {
  @Input() partnerId!: string;
  @Input() mode!: Upsert;
  @Input() fb!: FormBuilder;
  @Input() partnerCrudService!: PartnerCrudService;
  partner$: Observable<PartnerExtended> | undefined;
  formTitle = this.mode === 'create' ? 'Creazione Utente' : 'Modifica Utente';
  form!: FormGroup;
  fieldErrorMessage = 'Dato assente o Non corretto';

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.triggerEvents();
    this.initializeForm();
  }

  triggerEvents(){
    this.partner$ = this.partnerCrudService.getEntity(this.partnerId);
  }

  initializeForm(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      street: ['', Validators.required],
      zip: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(5),
      ]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      webSite: ['', Validators.required],
      vat: ['', Validators.required],
      fiscalCode: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$"),]],
      email: ['', [Validators.required, Validators.email]],
    }, { updateOn: 'submit'});
  }

  /**
   * Validation of each field in the form.
   * I'ts triggered only if was clicked submit button
   * @param fieldName: field name to examine
   * @returns: true se devo evidenziare il fatto che sia obbligatorio
   */
   isInvalid(form: FormGroupDirective, fieldName: string): boolean{
    if (!form.submitted){
      return false;
    }
    return this.form.get(fieldName)!.invalid;
  }

  onSubmit(){
    console.log("Foo!");
  }

}
