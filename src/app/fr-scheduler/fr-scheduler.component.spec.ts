import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrSchedulerComponent } from './fr-scheduler.component';

describe('FrSchedulerComponent', () => {
  let component: FrSchedulerComponent;
  let fixture: ComponentFixture<FrSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
