import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: any;
  avatar: any;

  constructor(
    private router: Router, 
    public  firebaseService: FirebaseService,
    private storage: Storage) { }

  ngOnInit(): void {
    this.user = this.firebaseService.getCurrentUser();
    this.getAvatar();
  }

  inicio() {
    this.router.navigateByUrl('/chats');
  }
  perfil() {
    this.router.navigateByUrl('/profile');
  }
  logout() {
    this.firebaseService.logout()
    .then(() => {
      this.router.navigateByUrl('/auth/login')
      }).catch((error) => {
        console.log(error)
      });
  }

  async getAvatar() {
    this.avatar =  await getDownloadURL(ref(this.storage, `images/${this.user.photoURL}`));
  }


}
