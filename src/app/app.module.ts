import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, SharedModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
