import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/login.model';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = Object.create(null);
  
  email: string = '';
  msg = '';
  errorLogin = false;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.errorLogin = false;
    this.loginForm = this.fb.group({
     
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });
  }

  
  public async login() {

    const loginData: ILogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.firebaseService.authenticate(loginData)
        .then( () => {
                  
          this.router.navigateByUrl('/chats');

        })
        .catch((error) => {
          this.errorLogin = true;
          this.msg = error.message;
          const errorCode = error.code
          const errorMessage = error.message;
      
        });
  }

  public signin() {
      this.router.navigateByUrl('/auth/signin')
  }

}
