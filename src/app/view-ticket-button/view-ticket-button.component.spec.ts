import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketButtonComponent } from './view-ticket-button.component';

describe('ViewTicketButtonComponent', () => {
  let component: ViewTicketButtonComponent;
  let fixture: ComponentFixture<ViewTicketButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTicketButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTicketButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
