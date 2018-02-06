import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UpdateService } from 'app/core/update.service';
import { BaseComponent } from 'app/shared/base.component';
import { Session } from 'app/shared/session.model';
import { UtilityService } from 'app/shared/utility.service';
import { WindowRef } from 'app/shared/window-ref.service';
import { environment } from 'environments/environment';

interface ComponentState {
  isLoading: boolean;
  updateAvailable: boolean;
  showUpdate: boolean;
}

@Component({
  selector: 'gsa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent<ComponentState>
  implements OnInit {
  private readonly componentName = 'App Component';

  title = 'gsa';

  version = environment.appVersion;

  session: Observable<Session>;

  displayUpdateModal: Observable<boolean>;

  componentState: Readonly<ComponentState> = {
    isLoading: false,
    updateAvailable: false,
    showUpdate: false
  };

  private updateCheckSubscription: Subscription;

  constructor(
    cd: ChangeDetectorRef,
    utilityService: UtilityService,
    private router: Router,
    private updateService: UpdateService,
    private windowRef: WindowRef
  ) {
    super(cd, utilityService);

    this.session = this.sessionService.session;
  }

  ngOnInit() {
    this.updateCheckSubscription = this.updateService
      .checkIsUpdateAvailable(true)
      .subscribe(updateAvailable => this.processUpdateCheck(updateAvailable));
  }

  onUpdate(response: boolean) {
    if (response) {
      this.debugService.log('UPDATING APPLICATION', this.componentName);
      this.windowRef.nativeWindow.location.reload(true);
    } else {
      this.debugService.log('DELAYING CURRENT UPDATE', this.componentName);
      this.setState({ showUpdate: false });
      this.updateCheckSubscription = this.updateService
        .checkIsUpdateAvailable(false)
        .subscribe(updateAvailable => this.processUpdateCheck(updateAvailable));
    }
  }

  onLogout() {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }

  private processUpdateCheck(updateAvailable: boolean) {
    if (!this.componentState.updateAvailable && updateAvailable) {
      this.updateService.stopChecks();
      this.updateCheckSubscription.unsubscribe();
    }

    this.setState({ updateAvailable, showUpdate: true });
  }
}
