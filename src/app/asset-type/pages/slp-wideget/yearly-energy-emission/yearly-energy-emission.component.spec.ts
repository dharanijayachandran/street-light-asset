import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyEnergyEmissionComponent } from './yearly-energy-emission.component';

describe('YearlyEnergyEmissionComponent', () => {
  let component: YearlyEnergyEmissionComponent;
  let fixture: ComponentFixture<YearlyEnergyEmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyEnergyEmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyEnergyEmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
