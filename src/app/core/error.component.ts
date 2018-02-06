import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { DebugService } from 'app/shared/debug.service';

@Component({
  selector: 'gsa-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {
  errorCode: Observable<number>;
  constructor(
    private route: ActivatedRoute,
    private debugService: DebugService
  ) {}

  ngOnInit() {
    this.errorCode = this.route.queryParams.pipe(
      map(p => parseInt((p as any).code || '400', 10)),
      tap(p => this.debugService.log(`Error code ${p}`))
    );
  }

  onReloadClick($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    window.location.href = '/';
  }
}
