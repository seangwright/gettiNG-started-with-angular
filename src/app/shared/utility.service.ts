import { Injectable } from '@angular/core';

import { DebugService } from 'app/shared/debug.service';
import { NotificationService } from 'app/shared/notification.service';
import { SessionService } from 'app/shared/session.service';

/**
 * @description Used with *ngFor directives to increase comparison performance when iterating over complex objects
 * @param {string} [key='id'] Key used to check for equality between objects. defaults to 'id'
 * @example trackBy = trackBy('codeName');
 */
export const createTrackBy = (key: string = 'id') => (
  _index: number,
  obj: any
) => (obj ? obj[key] : undefined);

@Injectable()
export class UtilityService {
  constructor(
    public debugService: DebugService,
    public notificationService: NotificationService,
    public sessionService: SessionService
  ) {}
}
