import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreRdvPatientComponent } from './list-pre-rdv-patient.component';

describe('ListPreRdvPatientComponent', () => {
  let component: ListPreRdvPatientComponent;
  let fixture: ComponentFixture<ListPreRdvPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPreRdvPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPreRdvPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
