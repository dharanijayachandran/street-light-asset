import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMonthEnergyAnalysisComponent } from './current-month-energy-analysis.component';

describe('CurrentMonthEnergyAnalysisComponent', () => {
  let component: CurrentMonthEnergyAnalysisComponent;
  let fixture: ComponentFixture<CurrentMonthEnergyAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentMonthEnergyAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentMonthEnergyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
