import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyRunHourAnalysisComponent } from './yearly-run-hour-analysis.component';

describe('YearlyRunHourAnalysisComponent', () => {
  let component: YearlyRunHourAnalysisComponent;
  let fixture: ComponentFixture<YearlyRunHourAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyRunHourAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyRunHourAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
