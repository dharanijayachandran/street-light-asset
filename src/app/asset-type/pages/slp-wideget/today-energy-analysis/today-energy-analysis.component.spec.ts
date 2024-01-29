import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayEnergyAnalysisComponent } from './today-energy-analysis.component';

describe('TodayEnergyAnalysisComponent', () => {
  let component: TodayEnergyAnalysisComponent;
  let fixture: ComponentFixture<TodayEnergyAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayEnergyAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayEnergyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
