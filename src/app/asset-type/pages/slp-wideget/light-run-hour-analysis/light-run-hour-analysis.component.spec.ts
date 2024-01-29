import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightRunHourAnalysisComponent } from './light-run-hour-analysis.component';

describe('LightRunHourAnalysisComponent', () => {
  let component: LightRunHourAnalysisComponent;
  let fixture: ComponentFixture<LightRunHourAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightRunHourAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightRunHourAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
