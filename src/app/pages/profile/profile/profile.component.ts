import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/providers/firebase.service';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes} from '@angular/fire/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imagenesCargadas: Array<any> = [];
  tmpImageUrl: string = '';
  tmpName: string = '';

  user: any;
  profileForm: FormGroup = Object.create(null);

  constructor(
    private firebaseService: FirebaseService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
  }

  save() {
    
  }

  uploadFile(e: any) {
    const file = e.target.files[0];
    this.tmpImageUrl = '';
    const imageRef = ref(this.storage, `images/${file.name}`);
    uploadBytes( imageRef, file).then( x => {
      this.tmpName = x.metadata.name;
      this.getImage();
    })
    .catch( error => {
      console.log(error)
    });
  }

  getImage() {
    this.imagenesCargadas = [];

    const imageRef = ref(this.storage, 'images');
    
    listAll(imageRef).then( async  images => {
      for (let image of images.items) {
        const url = await getDownloadURL(image);
        this.imagenesCargadas.push(url);
      }
      this.selectImage();
    });
  }

  selectImage() {
    if (this.tmpName === '') {
      this.tmpImageUrl = this.imagenesCargadas[0]
    } else {
      this.imagenesCargadas.forEach( (item: string) => {
        if(item.includes(this.tmpName) ) {
          this.tmpImageUrl = item;
          return;
        };
      
      })
    }
  }


}
