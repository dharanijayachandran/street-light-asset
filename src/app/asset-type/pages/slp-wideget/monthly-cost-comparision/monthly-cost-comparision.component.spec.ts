import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCostComparisionComponent } from './monthly-cost-comparision.component';

describe('MonthlyCostComparisionComponent', () => {
  let component: MonthlyCostComparisionComponent;
  let fixture: ComponentFixture<MonthlyCostComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyCostComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyCostComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
