import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleRegisterComponent } from './simple-register.component';

describe('SimpleRegisterComponent', () => {
  let component: SimpleRegisterComponent;
  let fixture: ComponentFixture<SimpleRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
