import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { Users } from '../../interfaces/users'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  successMessage:string ="";
  errorMessage:string='';
  registeredUsers : Users[] = [];
  token : string;
  public newRegForm:FormGroup;
  userToEdit : any;

  constructor(private fb: FormBuilder, private auth:AuthService, private UserSvc : UsersService, private route : ActivatedRoute) {
    this.token = localStorage.getItem('token');
    console.log(this.token)
    this.registeredUsers = UserSvc.getUsers();
    this.newRegForm = this.getNewRegistrationForm();
   }

  ngOnInit(): void {
  
     this.route.queryParams.subscribe(params=>{
     console.log("params : ",this.userToEdit)
     if(Object.keys(params).length>0){
     this.userToEdit = JSON.parse(atob(params.data));
     console.log(this.userToEdit)
     this.bindUserData();
   }
  })

  }
  getNewRegistrationForm(): FormGroup{
    return this.fb.group({
      firstname: ['',[Validators.required, Validators.pattern("[a-zA-Z]{5,15}")]],
      lastname:['',[Validators.required, Validators.pattern("[a-zA-Z]{5,15}")]],
      mob: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['',[Validators.required, Validators.email]],
      dob: ['',Validators.required],
      qualification: ['',Validators.required]
    },
    )
  }
  register(theUser : Users){
    // this.registeredUsers.push(theUser);
   if(!this.userToEdit){
      let email = this.auth.emailExist(theUser);
    let mob = this.auth.mobileExist(theUser);
    if(email || mob){
      this.errorMessage = 'User with same mobile number Or Email Exist..!'
    }
    else{
      this.registeredUsers.push(theUser);
      console.log("User added")
      localStorage.setItem(this.token,JSON.stringify(this.registeredUsers))
      this.successMessage = "User Successfully Registered..."
    }
  }
  else{
    let users = this.UserSvc.getUsers();;
    users.forEach((u,i)=>{
      if(u.firstname == theUser.firstname){
        users.splice(i,1);
        this.userToEdit = null;
        this.newRegForm.reset();
        users.push(theUser);
      }
      else if(u.firstname != theUser.firstname){
        this.errorMessage="sorry you can't update your name"
      }
    })
    console.log("this.userToEdit",this.userToEdit)
    localStorage.setItem(this.token,JSON.stringify(users))
    this.successMessage = "User Successfully Updated..."
  }
  }
  bindUserData(){
    this.newRegForm.patchValue(this.userToEdit);
    this.newRegForm.updateValueAndValidity();
  }
}
