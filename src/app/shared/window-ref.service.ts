import { Injectable } from '@angular/core';

const _window = (): Window => window;

@Injectable()
export class WindowRef {
  get nativeWindow(): Window {
    return _window();
  }
}
