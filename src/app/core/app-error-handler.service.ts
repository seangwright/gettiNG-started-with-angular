import { ErrorHandler, Injectable } from '@angular/core';

import { DebugService } from 'app/shared/debug.service';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private debugService: DebugService) {
    super();
  }

  handleError(error: any): void {
    super.handleError(error);

    this.debugService.log(`Error handled by AppErrorHandler`);
    this.debugService.log(`Maybe we send it to the API?`);
  }
}
