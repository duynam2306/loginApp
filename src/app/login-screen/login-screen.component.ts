import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
  public userUrl!: string;
  // Message
  public message!: string;
  // listUser
  public users!: User[];
  // Status of event at listUserComponent
  public statusUrl!: string;
  loginForm!: FormGroup;

  constructor(public userService: UserService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    // Form loginForm
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.maxLength(12), Validators.required]],
      password: ['', [Validators.maxLength(10), Validators.required]]
    });

    this.userService.usersCurrent.subscribe(users => this.users = users);
    this.userService.urlCurrent.subscribe(url => this.statusUrl = url);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Check login information
  public check: boolean = false;
  //New user = user at input form
  
  // Username and password input
  private usernameLogin!: string;
  private passwordLogin!: string;

  // Function login
  public checkLogIn(): void {
    this.usernameLogin = this.loginForm.value.username;
    this.passwordLogin = this.loginForm.value.password;

    // Find index location of login user
    const index = this.users.findIndex(user => user.username === this.usernameLogin);
    // If username of login user exist in users list
    if (index >= 0) {
      // Check password of log in user corresponding to username
      if (this.passwordLogin === this.users[index].password) {
        // Update status = "add"
        this.userService.changeUrl("add");
        // Show button login in html
        this.check = true;
        // Routing to listUserComponent
        // Go to listUser screen
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
  }

  // Function show and hide password when checkbox is clicked
  public showPassword(e: any) {
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
