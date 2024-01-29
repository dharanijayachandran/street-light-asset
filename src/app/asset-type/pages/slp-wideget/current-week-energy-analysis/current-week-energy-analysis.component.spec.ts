import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeekEnergyAnalysisComponent } from './current-week-energy-analysis.component';

describe('CurrentWeekEnergyAnalysisComponent', () => {
  let component: CurrentWeekEnergyAnalysisComponent;
  let fixture: ComponentFixture<CurrentWeekEnergyAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentWeekEnergyAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeekEnergyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
