import { TestBed } from '@angular/core/testing';

import { PayVueService } from './pay-vue.service';

describe('PayVueService', () => {
  let service: PayVueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayVueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
