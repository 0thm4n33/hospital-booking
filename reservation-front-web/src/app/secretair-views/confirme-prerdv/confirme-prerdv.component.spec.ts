import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmePrerdvComponent } from './confirme-prerdv.component';

describe('ConfirmePrerdvComponent', () => {
  let component: ConfirmePrerdvComponent;
  let fixture: ComponentFixture<ConfirmePrerdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmePrerdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmePrerdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
