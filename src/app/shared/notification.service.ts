import { Injectable } from '@angular/core';
import { DebugService } from 'app/shared/debug.service';

@Injectable()
export class NotificationService {
  constructor(private debugService: DebugService) {}

  success(msg: string) {
    this.debugService.log(msg);
  }

  failure(msg: string) {
    this.debugService.error(msg);
  }
}
