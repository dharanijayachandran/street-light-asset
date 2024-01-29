import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalParametersComponent } from './environmental-parameters.component';

describe('EnvironmentalParametersComponent', () => {
  let component: EnvironmentalParametersComponent;
  let fixture: ComponentFixture<EnvironmentalParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentalParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentalParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
