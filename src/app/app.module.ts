import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ListUserComponent } from './list-user/list-user.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './model/user.model';
import { UserService } from './user.service';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const apiUrl = 'https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    ListUserComponent,
    CreateUserComponent,
    AddUpdateUserComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [UserService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
