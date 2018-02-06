import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from 'app/user/profile.component';
import { UserRoutingModule } from 'app/user/user-routing.module';

@NgModule({
  imports: [SharedModule, UserRoutingModule],
  declarations: [ProfileComponent]
})
export class UserModule {}
