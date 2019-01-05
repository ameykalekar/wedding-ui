import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardproductComponent } from './onboardproduct.component';

describe('OnboardproductComponent', () => {
  let component: OnboardproductComponent;
  let fixture: ComponentFixture<OnboardproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
