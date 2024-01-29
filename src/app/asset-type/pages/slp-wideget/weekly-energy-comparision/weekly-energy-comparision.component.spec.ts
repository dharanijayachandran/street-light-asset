import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyEnergyComparisionComponent } from './weekly-energy-comparision.component';

describe('WeeklyEnergyComparisionComponent', () => {
  let component: WeeklyEnergyComparisionComponent;
  let fixture: ComponentFixture<WeeklyEnergyComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyEnergyComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyEnergyComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
