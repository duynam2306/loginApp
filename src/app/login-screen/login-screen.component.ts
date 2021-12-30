import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  @ViewChild('inputPassword')
  inputPassword!: ElementRef;
  @ViewChild('checkButton')
  checkButton!: ElementRef;

  userUrl!: string;
  message!: string;
  users!: User[];
  userLogin: User = {
    id: '',
    fullname: '',
    username: '',
    password: '',
    checkDelete: false,

  }

  constructor(public userService: UserService) {

  }

  // Get user list: users[]
  // getUsersFromService(): void {
  //   this.users = this.userService.getUsers();
  // }


  ngOnInit(): void {
    // this.getUsersFromService();
    this.userService.usersCurrent.subscribe(users => this.users = users);
    console.log(this.users);
  }

  // Function login
  checkLogIn(): void {
    // Find index location of log in user
    const index = this.users.findIndex(user => user.username === this.userLogin.username);
    // If username of log in user exist in user list
    if (index >= 0) {
      // Check password of log in user corresponding to username
      if (this.userLogin.password === this.users[index].password) {
        // Go to listUser screen
        this.userUrl = "/listUser";
      } else {
        // Messgae error
        this.message = "Username or password is incorrect";
      }
    } else {
      // Message error
      this.message = "Username or password is incorrect";
    }
  
    this.userService.changeListUser(this.users);
  }

  // Function show and hide password when checkbox is clicked
  showPassword(e: any) {
    setTimeout(() => {
      // If checkbox is checked, show password
      if (this.inputPassword.nativeElement.type === "password") {
        this.inputPassword.nativeElement.type = "text";

        // If checkbox is unchecked, hide password
      } else {
        this.inputPassword.nativeElement.type = "password";
      }
    }, 100);
  }

}
