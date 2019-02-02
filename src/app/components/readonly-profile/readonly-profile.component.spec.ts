import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyProfileComponent } from './readonly-profile.component';

describe('ReadonlyProfileComponent', () => {
  let component: ReadonlyProfileComponent;
  let fixture: ComponentFixture<ReadonlyProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadonlyProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
