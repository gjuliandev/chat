import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/login.model';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
  }

  
public async login() {

  const loginData: ILogin = {
    email: 'gjulian@gmail.com',
    password: '123456'
  }
  this.firebaseService.authenticate(loginData)
      .then( () => {
                
        this.router.navigateByUrl('/chats');

      })
      .catch((error) => {
      
        const errorCode = error.code
        const errorMessage = error.message;
    
      });
  }

  public signin() {
    this.router.navigateByUrl('/auth/signin')
  }

}
