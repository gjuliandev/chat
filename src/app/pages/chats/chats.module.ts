import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats/chats.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    ChatsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule
  ]
})
export class ChatsModule { }
