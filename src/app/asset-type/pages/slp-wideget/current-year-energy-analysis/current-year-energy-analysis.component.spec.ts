import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentYearEnergyAnalysisComponent } from './current-year-energy-analysis.component';

describe('CurrentYearEnergyAnalysisComponent', () => {
  let component: CurrentYearEnergyAnalysisComponent;
  let fixture: ComponentFixture<CurrentYearEnergyAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentYearEnergyAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentYearEnergyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
