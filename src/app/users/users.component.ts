import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { userProfile } from '../core/user-profile.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private usersCollection: AngularFirestoreCollection<userProfile>;
  users: Observable<userProfile[]>;

  constructor(private afs: AngularFirestore) { 
    this.usersCollection = afs.collection<userProfile>('users');
    this.users = this.usersCollection.valueChanges();
  }

  ngOnInit(): void {
  }

}
