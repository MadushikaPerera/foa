import { TestBed, inject } from '@angular/core/testing';

import { OderService } from './oder.service';

describe('OderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OderService]
    });
  });

  it('should be created', inject([OderService], (service: OderService) => {
    expect(service).toBeTruthy();
  }));
});
