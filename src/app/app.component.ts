import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'login-admin';

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    particlesJS.load('particles', 'assets/particles.json', () => {
      console.log('callback - particles.js config loaded');
    });
  }

  logout(){
    this.auth.logout();
  }

  log(){
    this.auth.isLoggedIn();
  }

  
  
}
