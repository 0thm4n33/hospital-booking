import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreRdvComponent } from './list-pre-rdv.component';

describe('ListPreRdvComponent', () => {
  let component: ListPreRdvComponent;
  let fixture: ComponentFixture<ListPreRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPreRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPreRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
