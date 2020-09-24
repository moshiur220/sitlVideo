import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoddingPageRoutingModule } from './lodding-routing.module';

import { LoddingPage } from './lodding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoddingPageRoutingModule
  ],
  declarations: [LoddingPage]
})
export class LoddingPageModule {}
