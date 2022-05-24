import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  $isLogged: Observable<boolean> = this.isLogged.asObservable();
  token: string = 'gal@gmail.com';
  email: string = '';
  constructor() {}

  logOut() {
    this.isLogged.next(false);
  }
  logIn() {
    this.isLogged.next(true);
  }
  isLoggedIn() {
    return this.isLogged.getValue();
  }
}
