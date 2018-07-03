import { TestBed, inject } from '@angular/core/testing';

import { GroupCheckinService } from './group-checkin.service';

describe('GroupCheckinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupCheckinService]
    });
  });

  it('should be created', inject([GroupCheckinService], (service: GroupCheckinService) => {
    expect(service).toBeTruthy();
  }));
});
