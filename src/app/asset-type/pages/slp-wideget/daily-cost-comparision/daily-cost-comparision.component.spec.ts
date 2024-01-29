import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCostComparisionComponent } from './daily-cost-comparision.component';

describe('DailyCostComparisionComponent', () => {
  let component: DailyCostComparisionComponent;
  let fixture: ComponentFixture<DailyCostComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyCostComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCostComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
