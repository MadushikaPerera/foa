import { TestBed, async, inject } from '@angular/core/testing';

import { AdminauthguardGuard } from './adminauthguard.guard';

describe('AdminauthguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminauthguardGuard]
    });
  });

  it('should ...', inject([AdminauthguardGuard], (guard: AdminauthguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
