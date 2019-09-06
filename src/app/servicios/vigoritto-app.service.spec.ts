import { TestBed } from '@angular/core/testing';

import { VigorittoAppService } from './vigoritto-app.service';

describe('VigorittoAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VigorittoAppService = TestBed.get(VigorittoAppService);
    expect(service).toBeTruthy();
  });
});
