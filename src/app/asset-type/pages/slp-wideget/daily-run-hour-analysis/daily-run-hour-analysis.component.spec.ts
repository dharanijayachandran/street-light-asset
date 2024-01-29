import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRunHourAnalysisComponent } from './daily-run-hour-analysis.component';

describe('DailyRunHourAnalysisComponent', () => {
  let component: DailyRunHourAnalysisComponent;
  let fixture: ComponentFixture<DailyRunHourAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyRunHourAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyRunHourAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
