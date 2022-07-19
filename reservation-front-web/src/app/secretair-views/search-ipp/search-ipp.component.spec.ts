import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIppComponent } from './search-ipp.component';

describe('SearchIppComponent', () => {
  let component: SearchIppComponent;
  let fixture: ComponentFixture<SearchIppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchIppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
