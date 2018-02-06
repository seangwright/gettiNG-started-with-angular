import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'app/core/admin.guard';
import { AuthGuard } from 'app/core/auth.guard';
import { ErrorComponent } from 'app/core/error.component';
import { LoginComponent } from 'app/core/login.component';
import { UnauthGuard } from 'app/core/unauth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user'
  },
  {
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard, AdminGuard]
  },
  {
    path: 'login',
    canActivate: [UnauthGuard],
    component: LoginComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
