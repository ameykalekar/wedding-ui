import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIdEditorComponent } from './custom-id-editor.component';

describe('CustomIdEditorComponent', () => {
  let component: CustomIdEditorComponent;
  let fixture: ComponentFixture<CustomIdEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomIdEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomIdEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
