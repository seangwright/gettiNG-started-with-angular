import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Session } from 'app/shared/session.model';

@Injectable()
export class SessionService {
  session: Observable<Session>;

  private sessionSource = new BehaviorSubject<Session>(new Session());

  constructor() {
    this.session = this.sessionSource.asObservable();
  }

  setSession(newSession: Session) {
    this.sessionSource.next(newSession);
  }

  logout() {
    this.sessionSource.next(new Session());
  }
}
