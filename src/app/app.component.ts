import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  constructor(){
    // localStorage.removeItem('token');
  }

  // loggedIn(){
  //   console.log('token : ',localStorage.getItem('token'))
  //   return localStorage.getItem('token');
  // }
}
