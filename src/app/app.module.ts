import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Day20181202Component } from './day20181202/day20181202.component';
import { FormsModule } from '@angular/forms';
import { Day20181203Component } from './day20181203/day20181203.component';
import { Day20181204Component } from './day20181204/day20181204.component';


@NgModule({
  declarations: [
    AppComponent,
    Day20181202Component,
    Day20181203Component,
    Day20181204Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }