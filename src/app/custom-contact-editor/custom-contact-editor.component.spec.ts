import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomContactEditorComponent } from './custom-contact-editor.component';

describe('CustomContactEditorComponent', () => {
  let component: CustomContactEditorComponent;
  let fixture: ComponentFixture<CustomContactEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomContactEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomContactEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
