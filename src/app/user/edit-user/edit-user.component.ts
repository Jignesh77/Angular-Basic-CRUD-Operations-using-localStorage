import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Users } from '../../interfaces/users';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  usersList : Users[] = [];
  constructor(private UserSvc : UsersService, private router : Router) {
    this.usersList = UserSvc.getUsers();
   }

  ngOnInit() {
  }
editUser(user: Users){
  this.router.navigate(['/register-user'],{queryParams:{data:btoa(JSON.stringify(user))}})
}
deleteUser(ind){
  this.usersList.splice(ind,1);
  let token = localStorage.getItem('token');
  localStorage.setItem(token,JSON.stringify(this.usersList))
}
}
