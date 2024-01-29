import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyCostComparisionComponent } from './yearly-cost-comparision.component';

describe('YearlyCostComparisionComponent', () => {
  let component: YearlyCostComparisionComponent;
  let fixture: ComponentFixture<YearlyCostComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyCostComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyCostComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
