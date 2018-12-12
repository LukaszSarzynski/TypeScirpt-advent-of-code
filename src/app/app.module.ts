import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Day20181202Component } from './day20181202/day20181202.component';
import { FormsModule } from '@angular/forms';
import { Day20181203Component } from './day20181203/day20181203.component';
import { Day20181204Component } from './day20181204/day20181204.component';
import { Day20181205Component } from './day20181205/day20181205.component';
import { Day20181206Component } from './day20181206/day20181206.component';
import { Day20181207Component } from './day20181207/day20181207.component';
import { Day20181208Component } from './day20181208/day20181208.component';
import { Day20181201Component } from './day20181201/day20181201.component';
import { Day20181210Component } from './day20181210/day20181210.component';
import { Day20181211Component } from './day20181211/day20181211.component';
import { Day20181212Component } from './day20181212/day20181212.component';


@NgModule({
  declarations: [
    AppComponent,
    Day20181202Component,
    Day20181203Component,
    Day20181204Component,
    Day20181205Component,
    Day20181206Component,
    Day20181207Component,
    Day20181208Component,
    Day20181201Component,
    Day20181210Component,
    Day20181211Component,
    Day20181212Component
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
