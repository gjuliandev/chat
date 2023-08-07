import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: any;

  constructor(
    private router: Router, 
    public  firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.user = this.firebaseService.getCurrentUser();
  }

  inicio() {
    this.router.navigateByUrl('/chats');
  }
  perfil() {
    this.router.navigateByUrl('/profile');
  }
  login() {
    this.router.navigateByUrl('/auth/login');
  }
  signin() {
    this.router.navigateByUrl('/auth/signin');
  }
  logout() {
    this.firebaseService.logout()
    .then(() => {
      this.router.navigateByUrl('/auth/login')
      }).catch((error) => {
        console.log(error)
      });
  }

}
