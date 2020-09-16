import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupcallPageRoutingModule } from './groupcall-routing.module';

import { GroupcallPage } from './groupcall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupcallPageRoutingModule
  ],
  declarations: [GroupcallPage]
})
export class GroupcallPageModule {}
