import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsWrapperComponent } from './charts-wrapper.component';

describe('ChartsWrapperComponent', () => {
  let component: ChartsWrapperComponent;
  let fixture: ComponentFixture<ChartsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
