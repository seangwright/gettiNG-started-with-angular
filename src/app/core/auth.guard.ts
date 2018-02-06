import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { SessionService } from 'app/shared/session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.isAuthenticated();
  }

  private isAuthenticated(): Observable<boolean> {
    return this.sessionService.session.pipe(
      map(session => {
        if (!session.isAuthenticated) {
          this.router.navigate(['/login']);

          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
