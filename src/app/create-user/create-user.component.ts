import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  // Get form inputPassword
  @ViewChild('inputPassword')
  inputPassword!: ElementRef;
  @ViewChild('checkButton')
  checkButton!: ElementRef;

  //  Message of create box
  public messageCreate!: string;
  // listUser
  private users!: User[];

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.usersCurrent.subscribe(users => this.users = users);
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

  // New user = user at input form
  public userSignUp: User = {
    id: '',
    fullname: '',
    username: '',
    password: '',
    checkDelete: false
  }

  // Message error of create box
  public messageCreateError!: string;
  
  // Function create 1 user
  public createUser(user: User): void {
    this.messageCreate = '';
    this.messageCreateError = '';
    // Create unique id
    do {
      // Get random id for user created
      var randomId = Math.floor(Math.random() * 1000) + 10;
      // Find index location of id created, if id is exist then get new id
      var index = this.users.findIndex(user => user.id === String(randomId));
    } while (index >= 0)
    this.userSignUp.id = String(randomId);
    // If form input is valid
    if (this.userSignUp.fullname !== '' && this.userSignUp.username !== '' && this.userSignUp.password !== '') {
      // Check username is exist
      var tempIndex = this.users.findIndex(user => user.username === this.userSignUp.username);
      // If username is exist in listUser
      if (tempIndex >= 0) {
        this.messageCreateError = 'Username is exist';
      } else {
        // Add userSignUp to listUser
        this.users[this.users.length] = this.userSignUp;
        // Update listUser 
        this.userService.changeListUser(this.users);
        this.messageCreate = "Sign Up Success";
      }
    } else 
    // Form input is invalid
    if (this.userSignUp.fullname === '' && this.userSignUp.username === '' && this.userSignUp.password === '') {
      this.messageCreateError = 'Fullname, Username and Password are invalid';
    };

    // Set userSignUp
    this.userSignUp = {
      id: '',
      fullname: '',
      username: '',
      password: '',
      checkDelete: false
    }
  }

}
