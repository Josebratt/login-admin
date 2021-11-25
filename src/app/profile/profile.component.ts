import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { userProfile } from '../core/user-profile.model';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private itemDoc: AngularFirestoreDocument<userProfile> | undefined;
  item!: Observable<userProfile | undefined>;
  uid: string | null;

  loading = false;
  error: string = '';

  constructor(
      public afAuth: AngularFireAuth, 
      public afs: AngularFirestore, 
      private route: ActivatedRoute, 
      private auth: AuthService) { 
      this.uid = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
      //  this.itemDoc = this.afs.doc<userProfile>(`users/${this.afAuth.currentUser}`);
      this.itemDoc = this.afs.doc<userProfile>(`users/${this.uid}`);
      this.item = this.itemDoc.valueChanges();
  }

  async onSubmit(ngForm: NgForm){
      this.loading = true;

      const {
        name,
        email,
        address,
        city,
        state,
        zip,
        phone,
        specialty,
        ip,
    } = ngForm.form.getRawValue();

    // Create UserProfile object  
    const userProfile: userProfile = {
        uid: this.uid!,
        name,
        email,
        address,
        city,
        state,
        zip,
        phone,
        specialty,
        ip
    };

    try {
      await this.auth.updateUserDocument(userProfile);
    } catch (error: any){
      console.log(error.message);
      this.error = error.message;
    }

    this.loading = false;
  }

}
