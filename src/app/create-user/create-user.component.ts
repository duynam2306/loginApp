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

  // Reset user
  private resetUser(): void {
    this.userSignUp = {
      id: '',
      fullname: '',
      username: '',
      password: '',
      checkDelete: false
    }
  }

  // Message error of create box
  public messageCreateError!: string;

  // Function create 1 user
  public createUser(user: User): void {
    this.messageCreate = '';
    this.messageCreateError = '';

    this.userService.setIdUser(this.userSignUp);

    // If form input is valid
    if (this.userSignUp.fullname !== '' && this.userSignUp.username !== '' && this.userSignUp.password !== '') {
      // Check username is exist
      var tempIndex = this.users.findIndex(user => user.username === this.userSignUp.username);
      // If username is exist in listUser
      if (tempIndex >= 0) {
        this.messageCreateError = 'Username is exist';
      } else {
        // Create a user
        this.userService.add(this.userSignUp);
        this.messageCreate = "Sign Up Success";
        console.log(this.users)
      }
    } else
      // Form input is invalid
      if (this.userSignUp.fullname === '' && this.userSignUp.username === '' && this.userSignUp.password === '') {
        this.messageCreateError = 'Fullname, Username and Password are invalid';
      };

    // Set userSignUp
    this.resetUser();
    
  }

}
