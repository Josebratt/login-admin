import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { userProfile } from './user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) { }

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['']);
  }

  isLoggedIn(){
    return !this.afAuth.currentUser;
  }

  async createUserDocument(){
    // get the current user
    const user = await this.afAuth.currentUser;

    // create de object with new data
    const userProfile: userProfile = {
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        specialty: '',
        ip: '',
    }

    // write to cloud firestore
    return this.afs.doc(`users/${user?.uid}`).set(userProfile);
  }

  updateUserDocument(userProfile: userProfile){
      return this.afs.doc(`users/${userProfile.uid}`).update(userProfile);
  }

  async routeOnLogin() {
    const user = await this.afAuth.currentUser;
    const token = await user?.getIdTokenResult();

    if (token!.claims.admin) {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate([`/profile/${user?.uid}`]);
    }
  }
}
