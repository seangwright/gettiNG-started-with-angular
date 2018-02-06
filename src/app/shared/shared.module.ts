import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DebugService } from 'app/shared/debug.service';
import { NotificationService } from 'app/shared/notification.service';
import { SessionService } from 'app/shared/session.service';
import { UtilityService } from 'app/shared/utility.service';
import { WindowRef } from 'app/shared/window-ref.service';

@NgModule({
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  declarations: [],
  exports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  providers: [UtilityService]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        NotificationService,
        DebugService,
        SessionService,
        WindowRef,
        HttpClient
      ]
    };
  }
}
