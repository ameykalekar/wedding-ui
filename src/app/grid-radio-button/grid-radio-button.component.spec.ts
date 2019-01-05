import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRadioButtonComponent } from './grid-radio-button.component';

describe('GridRadioButtonComponent', () => {
  let component: GridRadioButtonComponent;
  let fixture: ComponentFixture<GridRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridRadioButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
