import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() user: any;
  public mensajes: Array<any> = [];

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
      this.firebaseService.getMessages();
  }

}
