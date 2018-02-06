import { ErrorHandler, NgModule } from '@angular/core';

import { AppErrorHandler } from 'app/core/app-error-handler.service';
import { AuthGuard } from 'app/core/auth.guard';
import { CoreRoutingModule } from 'app/core/core-routing.module';
import { ErrorComponent } from 'app/core/error.component';
import { LoginComponent } from 'app/core/login.component';
import { UnauthGuard } from 'app/core/unauth.guard';
import { UpdateService } from 'app/core/update.service';
import { SharedModule } from 'app/shared/shared.module';
import { AdminGuard } from './admin.guard';

@NgModule({
  imports: [SharedModule, CoreRoutingModule],
  declarations: [LoginComponent, ErrorComponent],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    UpdateService,
    AuthGuard,
    UnauthGuard,
    AdminGuard
  ]
})
export class CoreModule {}
