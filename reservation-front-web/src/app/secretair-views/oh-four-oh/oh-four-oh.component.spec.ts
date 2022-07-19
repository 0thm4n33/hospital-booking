import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OhFourOhComponent } from './oh-four-oh.component';

describe('OhFourOhComponent', () => {
  let component: OhFourOhComponent;
  let fixture: ComponentFixture<OhFourOhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OhFourOhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OhFourOhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
