import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertPartnerComponent } from './upsert-partner.component';

describe('UpsertPartnerComponent', () => {
  let component: UpsertPartnerComponent;
  let fixture: ComponentFixture<UpsertPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
