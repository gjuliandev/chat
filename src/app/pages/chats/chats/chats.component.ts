import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  mensaje: string = '';
  @ViewChild('input') input!: ElementRef;
  user: any;
  
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.user = this.firebaseService.getCurrentUser();
  }

  public newMessage() {
    this.mensaje = (this.input.nativeElement.value).trim();
    if (this.mensaje ) {
      this.firebaseService.createMensaje(this.mensaje, this.user)
        .then( () => {
          this.mensaje = this.input.nativeElement.value = '';
        })
      //   .catch( (error) => console.log(error));
    }
  }
}
