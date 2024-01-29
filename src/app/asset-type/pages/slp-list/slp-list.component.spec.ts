import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlpListComponent } from './slp-list.component';

describe('SlpListComponent', () => {
  let component: SlpListComponent;
  let fixture: ComponentFixture<SlpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
