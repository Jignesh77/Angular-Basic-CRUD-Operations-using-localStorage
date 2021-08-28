import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidation } from '../../custom-validation'
import { AuthService } from '../../services/auth.service';
import { RegisteredUsersService } from '../../services/registered-users.service';
import { RegisteredUsers } from '../../interfaces/resitered-users'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  successMessage:string ="";
  errorMessage:string='';
  registeredUsers : RegisteredUsers[] = [];

  public regForm:FormGroup

  constructor(private fb: FormBuilder, private auth:AuthService, private registeredUserSvc : RegisteredUsersService) {
    console.log(localStorage.getItem('registeredUsers'));
    this.registeredUsers = registeredUserSvc.getregisteredUsers();
    console.log(this.registeredUsers)
    this.regForm = this.getRegistrationForm();
   }

  ngOnInit(): void {
  }
  getRegistrationForm(): FormGroup{
    return this.fb.group({
      username: ['',[Validators.required, Validators.pattern("[A-Za-z0-9_]{7,29}")]],
      email:['',[Validators.required,Validators.email]],
      password: ['',Validators.compose([
        Validators.required,
        CustomValidation.patternValidator(/\d/, { hasNumber: true }),
        CustomValidation.patternValidator(/[A-Z]/,{ hasCapitalCase: true }),
        CustomValidation.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidation.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,{ hasSpecialCharacters: true }),
        Validators.minLength(8)
      ])],
      confirmpassword: ['',Validators.compose([
        Validators.required,
      ])]
      
    },
    { 
      validator : CustomValidation.passwordMatchValidator
    })
  }
  register(theUser : RegisteredUsers){
    // this.registeredUsers.push(theUser);
    let key = theUser.username;
    let token = this.auth.userNameExist(theUser);
    if(token){
      this.errorMessage = 'already Exists...!'
    }
    else{
      this.registeredUsers.push(theUser);
      console.log("User added")
      localStorage.setItem(key,JSON.stringify(this.registeredUsers))
      this.successMessage = "Successfully Registered..."
    }
      console.log(theUser)
      // localStorage.setItem('registeredUsers',JSON.stringify(this.registeredUsers))
      // console.log('user registered')
    // }
    
    // this.registeredUsers.push[this.regForm.value];
    
    // console.log(this.regForm)
  }

}
