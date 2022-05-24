import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthGuard],
})
export class LoginComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.$isLogged.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }

  onClickSubmit(data: any) {
    this.loginService.email = data.email;
    if (this.loginService.email === this.loginService.token) {
      localStorage.setItem(this.loginService.token, 'token');
      this.loginService.logIn();
      this.router.navigate(['/leagues']);
    } else {
      alert('Unauthorized email address');
    }
  }

  ngOnInit(): void {}
}
