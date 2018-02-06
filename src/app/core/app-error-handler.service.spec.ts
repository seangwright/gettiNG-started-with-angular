import { TestBed, inject } from '@angular/core/testing';

import { AppErrorHandler } from 'app/core/app-error-handler.service';

describe('ErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppErrorHandler]
    });
  });

  it(
    'should be created',
    inject([AppErrorHandler], (service: AppErrorHandler) => {
      expect(service).toBeTruthy();
    })
  );
});
