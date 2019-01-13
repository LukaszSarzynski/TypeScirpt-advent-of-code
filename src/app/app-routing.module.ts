import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Day20181202Component } from './day20181202/day20181202.component';
import { Day20181214Component } from './day20181214/day20181214.component';
import { Day20181212Component } from './day20181212/day20181212.component';
import { Day20181210Component } from './day20181210/day20181210.component';
import { Day20181206Component } from './day20181206/day20181206.component';
import { Day20181205Component } from './day20181205/day20181205.component';
import { Day20181204Component } from './day20181204/day20181204.component';
import { Day20181203Component } from './day20181203/day20181203.component';

export const routes: Routes = [
  {
    path : '2018/02',
    component: Day20181202Component
  },
  {
    path : '2018/03',
    component: Day20181203Component
  },
  {
    path : '2018/04',
    component: Day20181204Component
  },
  {
    path : '2018/05',
    component: Day20181205Component
  },
  {
    path : '2018/06',
    component: Day20181206Component
  },
  {
    path : '2018/10',
    component: Day20181210Component
  },
  {
    path : '2018/12',
    component: Day20181212Component
  },
  {
    path : '2018/14',
    component: Day20181214Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
