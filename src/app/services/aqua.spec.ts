import { TestBed } from '@angular/core/testing';

import { Aqua } from './aqua';

describe('Aqua', () => {
  let service: Aqua;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aqua);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
