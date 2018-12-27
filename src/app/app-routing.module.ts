import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Day20181202Component } from './day20181202/day20181202.component';
import { Day20181214Component } from './day20181214/day20181214.component';

export const routes: Routes = [
  {
    path : '2018/02',
    component: Day20181202Component
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
