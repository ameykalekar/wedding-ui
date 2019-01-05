import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproducttoticketComponent } from './addproducttoticket.component';

describe('AddproducttoticketComponent', () => {
  let component: AddproducttoticketComponent;
  let fixture: ComponentFixture<AddproducttoticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproducttoticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproducttoticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
