import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  onNewMessageChanged: EventEmitter<any> = new EventEmitter();
  
  mensaje: string = '';
  @ViewChild('input') input!: ElementRef;
  user: any;
  @ViewChild('sectionchat') sectionchat!: ElementRef;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.user = this.firebaseService.getCurrentUser();
    this.scrollBottom();
  }

  scrollBottom() {
    setTimeout( ()=>{
      this.sectionchat.nativeElement.scrollTop = this.sectionchat.nativeElement.scrollHeight;
    },10);
  }

  public newMessage() {
    this.mensaje = (this.input.nativeElement.value).trim();
    if (this.mensaje ) {
      this.firebaseService.createMensaje(this.mensaje, this.user)
        .then( () => {
          this.mensaje = this.input.nativeElement.value = '';
          this.scrollBottom();
        })
        .catch( (error) => console.log(error));
    }
  }
}
