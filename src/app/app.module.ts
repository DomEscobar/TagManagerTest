import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbDatepickerModule } from "./datepicker/datepicker.module";
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    CookieBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDatepickerModule, FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true
    })
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
