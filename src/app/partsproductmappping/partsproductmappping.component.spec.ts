import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsproductmapppingComponent } from './partsproductmappping.component';

describe('PartsproductmapppingComponent', () => {
  let component: PartsproductmapppingComponent;
  let fixture: ComponentFixture<PartsproductmapppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsproductmapppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsproductmapppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
