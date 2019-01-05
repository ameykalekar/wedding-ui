import { TestBed, inject } from '@angular/core/testing';

import { ClientCustomerService } from './client-customer.service';

describe('ClientCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientCustomerService]
    });
  });

  it('should be created', inject([ClientCustomerService], (service: ClientCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
