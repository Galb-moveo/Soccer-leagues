import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Welcome to soccer leagues';
  isLogged = false;
  
  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.$isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }
  
  onSignOut() {
    this.loginService.logOut();
    this.router.navigate(['/home']);
    localStorage.clear();
  }
}
