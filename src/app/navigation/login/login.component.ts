import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidation } from '../../custom-validation'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  successMessage:string ="";
  loginForm!: FormGroup; 
  constructor(private fb: FormBuilder,private auth : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',[Validators.required, Validators.pattern("[A-Za-z0-9_]{7,29}")]],
      password:['',Validators.compose([
        Validators.required,
        CustomValidation.patternValidator(/\d/, { hasNumber: true }),
        CustomValidation.patternValidator(/[A-Z]/,{ hasCapitalCase: true }),
        CustomValidation.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidation.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,{ hasSpecialCharacters: true }),
        Validators.minLength(8)])]
  })
}

  login(){
    this.successMessage="Successfully Loggined In...";
    // this.router.navigate()
    // console.log(JSON.parse(localStorage.getItem('registeredUsers')))
    const token = this.auth.authUser(this.loginForm.value);
    if(token){
      localStorage.setItem('token',token.username)
      console.log("exist");
      this.router.navigate(['/register-user'])
    }
    else{
      console.log("no user found")
    }
  }

}


