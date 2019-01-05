import { TestBed, inject } from '@angular/core/testing';

import { ChecklistserviceService } from './checklistservice.service';

describe('ChecklistserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChecklistserviceService]
    });
  });

  it('should be created', inject([ChecklistserviceService], (service: ChecklistserviceService) => {
    expect(service).toBeTruthy();
  }));
});
