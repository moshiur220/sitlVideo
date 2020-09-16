import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupcallPage } from './groupcall.page';

const routes: Routes = [
  {
    path: '',
    component: GroupcallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupcallPageRoutingModule {}
