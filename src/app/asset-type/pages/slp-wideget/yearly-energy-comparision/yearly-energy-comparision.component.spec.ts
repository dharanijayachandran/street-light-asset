import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyEnergyComparisionComponent } from './yearly-energy-comparision.component';

describe('YearlyEnergyComparisionComponent', () => {
  let component: YearlyEnergyComparisionComponent;
  let fixture: ComponentFixture<YearlyEnergyComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyEnergyComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyEnergyComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
