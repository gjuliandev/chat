import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignin } from 'src/app/models/signin.model';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup = Object.create(null);
  
  email: string = '';
  msg = '';
  errorSignin = false;

  constructor(
    private router: Router,  
    private fb: FormBuilder,
    private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    
    this.signinForm = this.fb.group({
      nombre: [null, Validators.required],
      email: [this.email, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/auth/login')
  }

  signin() {
    const signinData: ISignin = {
      nombre: this.signinForm.value.nombre,
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    }

    this.firebaseService.register(signinData)
        .then( () => {  
          this.firebaseService.updateName(signinData.nombre);
          this.router.navigateByUrl('/chats');
        })
        .catch((error) => {
        
          const errorCode = error.code
          this.msg = error.message;
          this.errorSignin = true;
      
        });

  }

}
