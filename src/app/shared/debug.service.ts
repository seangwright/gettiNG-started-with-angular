import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

export const isDebug = () =>
  !environment.production || localStorage.getItem('debug');

function SkipLog() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor | undefined
  ) {
    if (!descriptor) {
      descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    }

    const originalMethod = descriptor.value;

    descriptor.value = function() {
      return !isDebug() ? undefined : originalMethod.apply(this, arguments);
    };

    return descriptor;
  };
}

@Injectable()
export class DebugService {
  constructor() {}

  @SkipLog()
  log(message: any, ...rest: any[]) {
    // tslint:disable-next-line:no-console
    console.log(message, ...rest);
  }

  @SkipLog()
  error(message: any, ...rest: any[]) {
    console.error(message, ...rest);
  }
}
