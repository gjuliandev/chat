import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

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

}
