import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantaneousElectricalParameterComponent } from './instantaneous-electrical-parameter.component';

describe('InstantaneousElectricalParameterComponent', () => {
  let component: InstantaneousElectricalParameterComponent;
  let fixture: ComponentFixture<InstantaneousElectricalParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantaneousElectricalParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantaneousElectricalParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
