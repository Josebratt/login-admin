import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { userProfile } from '../core/user-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private itemDoc: AngularFirestoreDocument<userProfile> | undefined;
  item: Observable<userProfile> | undefined;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) { 
  }

  async ngOnInit() {
      this.itemDoc = this.afs.doc<userProfile>(`users/${this.afAuth.currentUser.then()}`);
      this.item = this.itemDoc.valueChanges();
      // this.item = this.itemDoc.valueChanges();
  }

}
