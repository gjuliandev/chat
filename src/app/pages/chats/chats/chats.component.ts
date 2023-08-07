import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getAllMensajes();
  }

}
