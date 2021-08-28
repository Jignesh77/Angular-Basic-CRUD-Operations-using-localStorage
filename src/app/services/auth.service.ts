import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  constructor() {
    this.token = localStorage.getItem('token');
   }
  authUser(user:any){
    let userArray = [];
    if(localStorage.getItem('registeredUsers')){
      userArray = JSON.parse(localStorage.getItem('registeredUsers'));
    }
    return userArray.find(u => u.username ==  user.username && u.password == user.password) 
  }
  userNameExist(user:any){
    let userArray = [];
    console.log(user)
    if(localStorage.getItem('registeredUsers')){
      userArray = JSON.parse(localStorage.getItem('registeredUsers'));
    }
    return userArray.find((u) => {
     return u.username ==  user.username && u.email == u.email
    }) 
  }
  emailExist(user:any){
    let userArray = [];
    console.log(user)
    if(localStorage.getItem(this.token)){
      userArray = JSON.parse(localStorage.getItem(this.token));
    }
    return userArray.find((u) => {
     return u.email == u.email
    }) 
  }
  mobileExist(user:any){
    let userArray = [];
    console.log(user)
    if(localStorage.getItem(this.token)){
      userArray = JSON.parse(localStorage.getItem(this.token));
    }
    return userArray.find((u) => {
     return u.mob == u.mob
    }) 
  }
}
