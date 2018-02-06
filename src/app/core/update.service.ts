import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { DebugService } from 'app/shared/debug.service';
import { environment } from 'environments/environment';

@Injectable()
export class UpdateService {
  private static readonly serviceName = 'UpdateService';
  private cancelTimer = new Subject();

  constructor(private http: HttpClient, private debugService: DebugService) {}

  checkIsUpdateAvailable(runImmediately: boolean) {
    this.cancelTimer.next();

    const initialDelay = runImmediately
      ? 0
      : environment.updateReminderInterval;

    return timer(initialDelay, environment.updateReminderInterval).pipe(
      takeUntil(this.cancelTimer),
      switchMap(_val => this.versionCheck())
    );
  }

  stopChecks() {
    this.cancelTimer.next();
  }

  private versionCheck(): Observable<boolean> {
    this.debugService.log(
      'Checking for application updates',
      UpdateService.serviceName
    );

    return this.http.get<{ version: string }>('version.json').pipe(
      tap(file =>
        this.debugService.log(
          `Current version on server ${file.version}`,
          UpdateService.serviceName
        )
      ),
      tap(_ =>
        this.debugService.log(
          `Current version on client ${environment.appVersion}`,
          UpdateService.serviceName
        )
      ),
      map(
        file =>
          !this.versionsMatch(
            this.parseVersion(environment.appVersion),
            this.parseVersion(file.version)
          )
      ),
      tap(available => {
        this.debugService.log(
          `Update available: ${available}`,
          UpdateService.serviceName
        );
      }),
      catchError(error => {
        this.debugService.error(error);

        return Observable.throw(error);
      })
    );
  }

  private versionsMatch(
    appVersion: number[],
    serverVersion: number[]
  ): boolean {
    return appVersion.every((val, index) => val === serverVersion[index]);
  }

  private parseVersion(version: string): number[] {
    return version.split('.').map(val => parseInt(val, 10));
  }
}
