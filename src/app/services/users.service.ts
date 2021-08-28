import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users = [];
  constructor() {
    this.getUsers();
  }
  getUsers() {
    let user = localStorage.getItem('token');
    if (localStorage.getItem(user) === null) {
      this.users = [];
    } else {
      this.users = JSON.parse(
        localStorage.getItem(user)
      );
    }
    return this.users;
  }
}
