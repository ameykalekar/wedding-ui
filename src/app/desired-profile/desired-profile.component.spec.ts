import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesiredProfileComponent } from './desired-profile.component';

describe('DesiredProfileComponent', () => {
  let component: DesiredProfileComponent;
  let fixture: ComponentFixture<DesiredProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesiredProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesiredProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
