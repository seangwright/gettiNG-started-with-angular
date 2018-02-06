import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { SessionService } from 'app/shared/session.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private sessionService: SessionService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin();
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.isAdmin();
  }

  private isAdmin(): Observable<boolean> {
    return this.sessionService.session.pipe(
      map(session => session.role === 'admin'),
      take(1)
    );
  }
}
