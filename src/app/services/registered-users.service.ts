import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUsersService {
  registeredUsers = [];
  constructor() {
    this.getregisteredUsers();
  }
  getregisteredUsers() {
    if (localStorage.getItem('registeredUsers') === null) {
      this.registeredUsers = [];
    } else {
      this.registeredUsers = JSON.parse(
        localStorage.getItem('registeredUsers')
      );
    }
    return this.registeredUsers;
  }
}
