import { TestBed } from '@angular/core/testing';

import { ProfessoresService } from './professor.service';

describe('ProfessoresService', () => {
  let service: ProfessoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
