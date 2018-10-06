import { TestBed, inject } from '@angular/core/testing';

import { EintercepterService } from './eintercepter.service';

describe('EintercepterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EintercepterService]
    });
  });

  it('should be created', inject([EintercepterService], (service: EintercepterService) => {
    expect(service).toBeTruthy();
  }));
});
