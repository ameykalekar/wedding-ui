import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEfficiencyComponent } from './report-efficiency.component';

describe('ReportEfficiencyComponent', () => {
  let component: ReportEfficiencyComponent;
  let fixture: ComponentFixture<ReportEfficiencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEfficiencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEfficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
