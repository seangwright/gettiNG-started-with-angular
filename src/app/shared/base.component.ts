import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { createTrackBy, UtilityService } from 'app/shared/utility.service';

interface BaseComponentState {
  isLoading: boolean;
}

/**
 * @description CoreComponent - Provides common services through UtilityService, default trackBy function, cleanup of ngUnsubscribe
 *  imports of standard rxjs operators, setState() and failureHandler implementations and onFailure method hook
 */
export abstract class BaseComponent<
  T extends BaseComponentState = { isLoading: boolean }
> implements OnDestroy {
  componentState: Readonly<T> = {
    isLoading: false
  } as T;
  trackBy: (index: number, obj: any) => any;

  protected createTrackBy = createTrackBy;
  protected ngUnsubscribe = new Subject();

  constructor(
    protected cd: ChangeDetectorRef,
    protected utilityService: UtilityService
  ) {
    this.trackBy = this.createTrackBy();

    // See http://blog.stack.foundation/2016/06/24/using-class-inheritance-to-hook-to-angular2-component-lifecycle/
    // Grab the function prototype ngOnDestroy
    const protoTypeOnDestroy = this.ngOnDestroy.bind(this);
    // Create ngOnDestroy method property on the component instance which calls the prototype function
    this.ngOnDestroy = () => {
      protoTypeOnDestroy();

      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    };
  }

  ngOnDestroy() {}

  protected onFailure = (_error?: any) => {};

  protected get debugService() {
    return this.utilityService.debugService;
  }
  protected get notificationService() {
    return this.utilityService.notificationService;
  }

  protected get sessionService() {
    return this.utilityService.sessionService;
  }

  protected setState(state: Partial<T>) {
    this.componentState = Object.assign(this.componentState, state);
    this.cd.detectChanges();
  }

  protected failureHandler = (error: any) => {
    this.debugService.error(error);
    this.setState({ isLoading: false } as T);
    this.notificationService.failure('Error.General.RequestFailure');
    this.onFailure(error);
  };
}
