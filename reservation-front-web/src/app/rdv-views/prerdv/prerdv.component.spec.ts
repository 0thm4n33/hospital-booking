import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerdvComponent } from './prerdv.component';

describe('PrerdvComponent', () => {
  let component: PrerdvComponent;
  let fixture: ComponentFixture<PrerdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrerdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrerdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
