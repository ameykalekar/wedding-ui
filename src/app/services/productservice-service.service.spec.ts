import { TestBed, inject } from '@angular/core/testing';

import { ProductserviceServiceService } from './productservice-service.service';

describe('ProductserviceServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductserviceServiceService]
    });
  });

  it('should be created', inject([ProductserviceServiceService], (service: ProductserviceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
