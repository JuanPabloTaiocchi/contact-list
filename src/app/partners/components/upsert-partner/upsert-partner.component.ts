import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PartnerExtended } from 'src/models/PartnerExtended.model';
import { PartnerCrudService } from '../../services/partner-crud.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { getHttpErrorMessage } from 'src/app/utils/http';


/**
 * Partner Upsert form: it only validates the form and use a crud service to to CRUD operations (DI)
 * @Input partnerId: the partner id, present if in edit mode
 * @Input fb: FormBuilder service, present because can't inject directly via ng-bootstrap
 * @Input partnerCrudService: partnerCrudService service, present because can't inject directly via ng-bootstrap
 */
@Component({
  selector: 'app-upsert-partner',
  templateUrl: './upsert-partner.component.html',
  styleUrls: ['./upsert-partner.component.css']
})
export class UpsertPartnerComponent implements OnInit {
  @Input() partnerId: string | undefined;
  @Input() fb!: FormBuilder;
  @Input() partnerCrudService!: PartnerCrudService;
  initialize$: Observable<PartnerExtended | void> | undefined;
  formTitle = this.isEditMode() ? 'Creazione Utente' : 'Modifica Utente';
  form!: FormGroup;
  fieldErrorMessage = 'Dato assente o Non corretto';

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.triggerEvents();
  }

  /**
   * In case of edit mode, fetch partner data otherwise do nothing
   */  
  triggerEvents(): void{
    if(!this.isEditMode()){
      return this.initializeForm();
    }
    this.initialize$ = this.partnerCrudService.get(this.partnerId!).pipe(
      first(),
      tap((partner: PartnerExtended) => this.initializeForm(partner))
    );
  }

  /**
   * Initialize partner form
   * `updateOn: 'submit'` is used to avoid validation on each keypress
   * @param partner: The partner, in case of edit mode
   */
  initializeForm(partner?: PartnerExtended): void{
    this.form = this.fb.group({
      name: [ partner?.name ?? '', Validators.required],
      surname: [ partner?.surname ?? '', Validators.required],
      photo: [partner?.photo ?? '', [Validators.required]],
      street: [ partner?.street ?? '', Validators.required],
      zip: [ partner?.zip ?? '', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(5),
      ]],
      city: [ partner?.city ?? '', Validators.required],
      country: [ partner?.country ?? '', Validators.required],
      webSite: [ partner?.webSite ?? '', Validators.required],
      vat: [ partner?.vat ?? '', Validators.required],
      fiscalCode: [ partner?.fiscalCode ?? '', Validators.required],
      mobile: [ partner?.mobile ?? '', [Validators.required, Validators.pattern("^[0-9]*$"),]],
      email: [partner?.email ?? '', [Validators.required, Validators.email]],
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

  /**
   * Trigger create/edit call (only if form is valid)
   */
  onSubmit(): void{
    if(!this.form.valid){ return; }
    const data: PartnerExtended = {
      ...this.form.value,
      ...(this.isEditMode() && { id: this.partnerId }),
    };
    const $operation = this.isEditMode() ? this.partnerCrudService.update(data) : this.partnerCrudService.create(data);
    $operation.pipe(first()).subscribe(
      () => this.handleSuccessOperation(),
      (e: unknown) => console.log(getHttpErrorMessage(e))
    );
  }

  /**
   * Handle Modal Closing
   */
  handleSuccessOperation(): void{ this.activeModal.close(); }

  /**
   * If there is a partnerId, it's in edit mode
   */
  isEditMode(): boolean{
    return !!(this.partnerId);
  }

}
