import { TestBed } from '@angular/core/testing';

import { MovieServiceService } from './movie-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('MovieServiceService', () => {
  let service: MovieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(MovieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
