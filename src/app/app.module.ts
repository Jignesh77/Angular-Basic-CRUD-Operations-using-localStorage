import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { routingComponents } from './app-routing/app-routing.module'
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthService } from './services/auth.service';
import { RegisteredUsersService } from './services/registered-users.service';
import { UsersService } from './services/users.service';
import { NavigationComponent } from './navigation/navigation.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavigationComponent,
    NewUserComponent,
    PageNotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthService,RegisteredUsersService,UsersService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
