import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  {path: "loginScreen", component: LoginScreenComponent},
  {path: "createUser", component: CreateUserComponent},
  {path: "add-update", component: AddUpdateUserComponent},
  {path: "listUser", component: ListUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [LoginScreenComponent, ListUserComponent, CreateUserComponent, AddUpdateUserComponent];
