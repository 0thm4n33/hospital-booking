import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttribuerIPPComponent } from './attribuer-ipp.component';

describe('AttribuerIPPComponent', () => {
  let component: AttribuerIPPComponent;
  let fixture: ComponentFixture<AttribuerIPPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttribuerIPPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttribuerIPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
