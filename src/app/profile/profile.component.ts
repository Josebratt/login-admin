import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { trace } from 'console';
import { Observable } from 'rxjs';
import { userProfile } from '../core/user-profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private itemDoc!: AngularFirestoreDocument<userProfile>;
  item!: Observable<userProfile>;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) { 
  }

  async ngOnInit() {
      this.itemDoc = this.afs.doc<userProfile>(`users/${this.afAuth.currentUser}`);
      this.item = this.itemDoc.valueChanges();
  }

}
