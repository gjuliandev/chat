import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, getFirestore, onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ILogin } from '../models/login.model';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { ISignin } from '../models/signin.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  firestore: Firestore = inject(Firestore);
  public item$!: Observable<any[]>;
  db = getFirestore();
  collectionRef = collection(this.firestore, 'chats') as any;

  mensajes: Array<any> = [];
  
  constructor() { }

  getMessages() {

    this.mensajes = [];

    // Hacemos una query para que los ordene por fecha ascendente
    const q =  query(this.collectionRef,
      orderBy('fecha', 'asc'),
    );

    onSnapshot(q, (querySnapshot) => {
              this.mensajes = [];
              querySnapshot.forEach((doc:any) => {
                this.mensajes.push(doc.data());
              });
            });

  }


  // Añadimos el mensaje 
  createMensaje(texto: string, user: any) {
    const body = { 
      nombre: user.displayName || 'no-name',
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: user.uid
    }
    return addDoc(this.collectionRef, body);
  }

  // AUTH

  public authenticate(loginData: ILogin) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, loginData.email, loginData.password);
  }

  public register(registerData: ISignin) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
  }

  public isLoggedIn(): boolean {
    const currentUser = getAuth().currentUser;
    return currentUser ? true : false; 
  }

  public getCurrentUser() {
    return getAuth().currentUser;
  }

  public checkAuthState() {
    return getAuth().onAuthStateChanged( ( user) => {
      console.log('changing', user)
    });
  }

  updateName(name: string) { 
    updateProfile(this.getCurrentUser()!, {
      displayName: name
    }).then();
  }

  updateUser(body: any) {
    return updateProfile(this.getCurrentUser()!, body);
  }

  public logout() {
    const auth = getAuth();
    return signOut(auth);
  }
}
