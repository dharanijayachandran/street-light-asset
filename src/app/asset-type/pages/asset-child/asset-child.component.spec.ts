import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetChildComponent } from './asset-child.component';

describe('AssetChildComponent', () => {
  let component: AssetChildComponent;
  let fixture: ComponentFixture<AssetChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
