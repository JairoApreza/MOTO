import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { User } from '../admin/shared/user.interface';//localizar esta carpeta
import { AngularFireAuth } from '@angular/fire/auth';
//import { auth } from 'firebase/app';
//import { Observable, of } from 'rxjs/op erators';
import { switchMap } from 'rxjs/operators';//checar esta linea


import {AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$:Observable<User>;

  constructor(private afAuth:AngularFireAuth, private afs: AngularFirestore) { 
  this.user$ = this.afAuth.authState.pipe(
    switchMap((user)=>{//
      if (user){
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      }
      return of(null);//null de tipo observable, puede estar aqui o en algun metodo independiente
    })
  )
}
  //METODOS PARA NUESTRO CLIENTE
//METODO DE INICION DE SESION CON GOOGLE

/*async loginGoogle(): Promise<User>{
  try {//CHCAR LA IMPORTACION DE FIREBASE/APP EL AUTH
    const {user}= await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    this.updateUserData(user);
    return user;
  } catch (error) {
    console.log('Error->', error);
  }
  
} */ 
//METODO DE MODIFICAR PASSWORD
  async resetPassword(email: string): Promise<void>{
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }


//METODO DE REGISTRO
  async register(email: string, password: string): Promise<User>{
try {
  const {user}= await this.afAuth.createUserWithEmailAndPassword(email, password);
  await this.senVerificationEmail();
  return user;
} catch (error) {
  console.log('Error->', error);
}

  }
//METODO DE INICIO DE SESION
  async login(email: string, password: string): Promise<User>{
    try{
      const {user}= await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    }catch(error){
      console.log('Error->', error);
    }
  }
//METODO DE VERIFICACION
  async senVerificationEmail(): Promise<void>{
    try {
      return(await this.afAuth.currentUser).sendEmailVerification();//aqui se envia el email de verificacion
    } catch (error) {
      console.log('Error->', error);
    }
  }

//METODO DE CIERRE DE SESION
  async logout(): Promise<void>{
  try {
    await this.afAuth.signOut();
  }
  catch(error){
  console.log('Error->', error);
  }
}
  
  private updateUserData(user:User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data:User = {
      uid:user.uid,
      email:user.email,
      emailVerified:user.emailVerified,
      displayName:user.displayName,
    };
    return userRef.set(data, { merge: true});
  }
}

















































//https://www.youtube.com/watch?v=VuyoS5NpHVE&t=1034s