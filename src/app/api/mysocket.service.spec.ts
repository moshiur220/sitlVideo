import { TestBed } from '@angular/core/testing';

import { MysocketService } from './mysocket.service';

describe('MysocketService', () => {
  let service: MysocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MysocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
