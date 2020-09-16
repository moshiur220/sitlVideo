import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagelistPageRoutingModule } from './messagelist-routing.module';

import { MessagelistPage } from './messagelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagelistPageRoutingModule
  ],
  declarations: [MessagelistPage]
})
export class MessagelistPageModule {}
