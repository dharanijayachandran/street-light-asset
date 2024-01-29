import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyCostComparisionComponent } from './weekly-cost-comparision.component';

describe('WeeklyCostComparisionComponent', () => {
  let component: WeeklyCostComparisionComponent;
  let fixture: ComponentFixture<WeeklyCostComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyCostComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyCostComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
