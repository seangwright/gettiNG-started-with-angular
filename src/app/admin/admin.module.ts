import { NgModule } from '@angular/core';

import { AdminRoutingModule } from 'app/admin/admin-routing.module';
import { UserListComponent } from 'app/admin/user-list.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [UserListComponent]
})
export class AdminModule {}
