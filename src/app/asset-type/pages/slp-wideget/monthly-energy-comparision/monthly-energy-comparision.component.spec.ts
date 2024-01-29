import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEnergyComparisionComponent } from './monthly-energy-comparision.component';

describe('MonthlyEnergyComparisionComponent', () => {
  let component: MonthlyEnergyComparisionComponent;
  let fixture: ComponentFixture<MonthlyEnergyComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyEnergyComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyEnergyComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
