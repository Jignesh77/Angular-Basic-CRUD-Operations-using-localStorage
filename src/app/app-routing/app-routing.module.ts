import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../navigation/login/login.component';
import { UserComponent } from '../user/user.component';
import { RegisterComponent } from '../navigation/register/register.component';
import { EditUserComponent } from '../user/edit-user/edit-user.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { NewUserComponent } from '../user/new-user/new-user.component';
import { AuthGuard } from '../auth/auth.guard';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'login', component: NavigationComponent,
    children:[{
      path:'',component:LoginComponent
    }]
  },
  { path: 'register', component: NavigationComponent,
    children:[{
      path:'',component:RegisterComponent
    }] 
  },
  { path: 'register-user', component:UserComponent,
    children:[{
      path:'',component:NewUserComponent
    }],canActivate:[AuthGuard]
  },
  { path: 'user-details', component: UserComponent,
    children:[{
      path:'',component:EditUserComponent
    }],canActivate:[AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**',component:PageNotFoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ LoginComponent, RegisterComponent, UserComponent, EditUserComponent]
