import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepartsComponent } from './createparts.component';

describe('CreatepartsComponent', () => {
  let component: CreatepartsComponent;
  let fixture: ComponentFixture<CreatepartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
