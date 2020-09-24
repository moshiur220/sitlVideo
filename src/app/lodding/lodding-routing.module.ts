import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoddingPage } from './lodding.page';

const routes: Routes = [
  {
    path: '',
    component: LoddingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoddingPageRoutingModule {}
