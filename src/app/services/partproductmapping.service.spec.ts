import { TestBed, inject } from '@angular/core/testing';

import { PartproductmappingService } from './partproductmapping.service';

describe('PartproductmappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartproductmappingService]
    });
  });

  it('should be created', inject([PartproductmappingService], (service: PartproductmappingService) => {
    expect(service).toBeTruthy();
  }));
});
