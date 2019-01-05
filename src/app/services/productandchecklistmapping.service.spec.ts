import { TestBed, inject } from '@angular/core/testing';

import { ProductandchecklistmappingService } from './productandchecklistmapping.service';

describe('ProductandchecklistmappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductandchecklistmappingService]
    });
  });

  it('should be created', inject([ProductandchecklistmappingService], (service: ProductandchecklistmappingService) => {
    expect(service).toBeTruthy();
  }));
});
