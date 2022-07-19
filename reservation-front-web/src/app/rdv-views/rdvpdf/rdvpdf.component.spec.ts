import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvpdfComponent } from './rdvpdf.component';

describe('RdvpdfComponent', () => {
  let component: RdvpdfComponent;
  let fixture: ComponentFixture<RdvpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
