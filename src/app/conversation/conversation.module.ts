import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ConversationPageRoutingModule } from "./conversation-routing.module";

import { ConversationPage } from "./conversation.page";
import { NgxEmojiPickerModule } from "ngx-emoji-picker";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversationPageRoutingModule,
    NgxEmojiPickerModule,
  ],
  declarations: [ConversationPage],
})
export class ConversationPageModule {}
