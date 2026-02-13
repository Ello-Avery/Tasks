import { TestBed } from '@angular/core/testing';

import { Export } from './export';

describe('Export', () => {
  let service: Export;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Export);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
