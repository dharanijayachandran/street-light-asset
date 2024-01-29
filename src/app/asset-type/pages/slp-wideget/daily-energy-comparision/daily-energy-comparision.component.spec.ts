import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyEnergyComparisionComponent } from './daily-energy-comparision.component';

describe('DailyEnergyComparisionComponent', () => {
  let component: DailyEnergyComparisionComponent;
  let fixture: ComponentFixture<DailyEnergyComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyEnergyComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyEnergyComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
