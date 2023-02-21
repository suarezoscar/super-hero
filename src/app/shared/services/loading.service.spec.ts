import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading state to true', (done: DoneFn) => {
    service.loading$.pipe(skip(1)).subscribe((isLoading: boolean) => {
      expect(isLoading).toBeTrue();
      done();
    });
    service.isLoading = true;
  });
});
