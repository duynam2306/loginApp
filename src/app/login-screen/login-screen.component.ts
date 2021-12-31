import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  // Get form inputPassword
  @ViewChild('inputPassword')
  inputPassword!: ElementRef;
  @ViewChild('checkButton')
  checkButton!: ElementRef;

  // routeLink to listUserComponent
  userUrl!: string;
  // Message
  message!: string;
  // listUser
  users!: User[];
  // Status of event at listUserComponent
  statusUrl!: string;

  constructor(public userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.usersCurrent.subscribe(users => this.users = users);
    this.userService.urlCurrent.subscribe(url => this.statusUrl = url);
  }

  // Check login information
  check: boolean = false;
  //New user = user at input form
  userLogin: User = {
    id: '',
    fullname: '',
    username: '',
    password: '',
    checkDelete: false,
  }
  
  // Variable to check exist uers from input
  check: boolean = false;
  // Function login
  checkLogIn(): void {
    // Find index location of login user
    const index = this.users.findIndex(user => user.username === this.userLogin.username);
    // If username of login user exist in users list
    if (index >= 0) {
      // Check password of log in user corresponding to username
      if (this.userLogin.password === this.users[index].password) {
<<<<<<< HEAD
        // Update listUser
        this.userService.changeListUser(this.users);
        // Update status = "add"
        this.userService.changeUrl("add");
        // Show button login in html
        this.check = true;
        // Routing to listUserComponent
=======
        // Go to listUser screen
        this.userService.changeListUser(this.users);
>>>>>>> upstream/main
        this.userUrl = "/listUser";
        this.check = true;
      } else {
        // Messgae error
        this.message = "Username or password is incorrect";
      }
    } else {
      // Message error
      this.message = "Username or password is incorrect";
    }
<<<<<<< HEAD
=======
  
>>>>>>> upstream/main
  }

  // Function show and hide password when checkbox is clicked
  showPassword(e: any) {
    // Get delay
    setTimeout(() => {
      // If type of password is password (checkbox isn't checked)
      if (this.inputPassword.nativeElement.type === "password") {
        // Show password
        this.inputPassword.nativeElement.type = "text";
      } else {
        // If checkbox is unchecked, hide password
        this.inputPassword.nativeElement.type = "password";
      }
    }, 100);
  }

}
