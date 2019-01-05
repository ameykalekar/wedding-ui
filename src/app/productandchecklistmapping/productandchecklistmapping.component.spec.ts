import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductandchecklistmappingComponent } from './productandchecklistmapping.component';

describe('ProductandchecklistmappingComponent', () => {
  let component: ProductandchecklistmappingComponent;
  let fixture: ComponentFixture<ProductandchecklistmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductandchecklistmappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductandchecklistmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
