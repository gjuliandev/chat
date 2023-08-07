import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
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
