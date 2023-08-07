import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/providers/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
  }

}
