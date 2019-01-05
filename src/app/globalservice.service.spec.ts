import { TestBed, inject } from '@angular/core/testing';

import { GlobalserviceService } from './globalservice.service';

describe('GlobalserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalserviceService]
    });
  });

  it('should be created', inject([GlobalserviceService], (service: GlobalserviceService) => {
    expect(service).toBeTruthy();
  }));
});
