import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Router } from '@angular/router/';
import { Observable } from 'rxjs/Observable';

import { SessionService } from 'app/shared/session.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionService.session.pipe(
      map(session => {
        if (session.isAuthenticated) {
          this.router.navigate(['/user']);

          return false;
        }

        return true;
      })
    );
  }
}
