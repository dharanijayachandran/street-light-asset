import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRunHourAnalysisComponent } from './monthly-run-hour-analysis.component';

describe('MonthlyRunHourAnalysisComponent', () => {
  let component: MonthlyRunHourAnalysisComponent;
  let fixture: ComponentFixture<MonthlyRunHourAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyRunHourAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyRunHourAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
