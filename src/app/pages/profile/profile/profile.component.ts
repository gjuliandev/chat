import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/providers/firebase.service';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes} from '@angular/fire/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imagenesCargadas: Array<any> = [];
  tmpImageURL: string = '';
  tmpName: string = '';

  user: any;
  profileForm: FormGroup = Object.create(null);
  errorProfile = false;

  constructor(
    private firebaseService: FirebaseService,
    private storage: Storage,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.user = this.firebaseService.getCurrentUser();
    this.getTmpAvatar(this.user.photoURL);

    this.errorProfile = false;
    this.profileForm = this.fb.group({
      nombre: [this.user.displayName, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      // password: [this.user.password, Validators.required]
    });
  }

  save() {
    const updateProfile = {
      displayName: this.profileForm.value.nombre,
      email: this.profileForm.value.email,
      photoURL: this.tmpName ? this.tmpName : this.user.photoURL
    }
    this.firebaseService.updateUser(updateProfile)
      .then( resp => console.log(resp) )
      .catch( error => console.log(error));
  }

  uploadFile(e: any) {
    const file = e.target.files[0];
    const imageRef = ref(this.storage, `images/${file.name}`);
    uploadBytes( imageRef, file).then( x => {
      this.tmpName = x.metadata.name;
      this.getTmpAvatar(file.name);
    })
    .catch( error => {
      console.log(error)
    });
  }

  async getTmpAvatar(fileName: any) {
    this.tmpImageURL =  await getDownloadURL(ref(this.storage, `images/${fileName}`));
  }

}
