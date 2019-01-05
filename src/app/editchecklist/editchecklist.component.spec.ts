import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditchecklistComponent } from './editchecklist.component';

describe('EditchecklistComponent', () => {
  let component: EditchecklistComponent;
  let fixture: ComponentFixture<EditchecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
