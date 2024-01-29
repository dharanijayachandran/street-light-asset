import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlpDetailComponent } from './slp-detail.component';

describe('SlpDetailComponent', () => {
  let component: SlpDetailComponent;
  let fixture: ComponentFixture<SlpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
