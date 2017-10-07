import { TestBed, inject } from '@angular/core/testing';

import { ColorAnimateService } from './color-animate.service';

describe('ColorAnimateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorAnimateService]
    });
  });

  it('should ...', inject([ColorAnimateService], (service: ColorAnimateService) => {
    expect(service).toBeTruthy();
  }));
});
