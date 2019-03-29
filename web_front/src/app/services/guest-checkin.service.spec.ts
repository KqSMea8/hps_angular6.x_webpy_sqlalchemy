import { TestBed, inject } from '@angular/core/testing';

import { GuestCheckinService } from './guest-checkin.service';

describe('GuestCheckinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestCheckinService]
    });
  });

  it('should be created', inject([GuestCheckinService], (service: GuestCheckinService) => {
    expect(service).toBeTruthy();
  }));
});
