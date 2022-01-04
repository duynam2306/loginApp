import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ViewChild, ElementRef } from '@angular/core';
import { User } from '../model/user.model';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {

  // Get form inputPassword
  @ViewChild('inputPassword')
  inputPassword!: ElementRef;
  @ViewChild('checkButton')
  checkButton!: ElementRef;

  // message of create box
  public messageCreate!: string;
  public messageCreateError!: string;
  // listUser
  private users!: User[];
  // id of user was click
  private id!: string;
  // status = "add"
  public statusUrl!: string;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.usersCurrent.subscribe(users => this.users = users);
    this.userService.idCurrent.subscribe(id => this.id = id);
    this.userService.urlCurrent.subscribe(url => this.statusUrl = url);
    this.getUserUpdate();
  }

  public showPassword(e: any) {
    //Delay
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

  // New user = user at index
  public userUpdate: User = {
    id: '',
    fullname: '',
    username: '',
    password: '',
    checkDelete: false,
  }

  // Get user need to be updated
  private getUserUpdate(): void {
    this.userUpdate = {
      id: this.users[Number(this.id)].id,
      fullname: this.users[Number(this.id)].fullname,
      username: this.users[Number(this.id)].username,
      password: this.users[Number(this.id)].password,
      checkDelete: false,
    }
  }

  // Message of update box
  public messageUpdate!: string;
  public messageUpdateError!: string;

  // Function update user when Update is clicked in Update box
  // statusUrl = "update"
  public updateUser(user: User) {
    this.messageUpdate = '';
    // If form input is valid
    if (this.userUpdate.fullname !== '' && this.userUpdate.username !== '' && this.userUpdate.password !== '') {
      // Set user at index = user at update input form
      this.users[Number(this.id)] = this.userUpdate;
      // Update listUser
      this.userService.changeListUser(this.users);
      // Message
      this.messageUpdate = "Updated";
    } 
  }

  // New user = user at signup input form
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

  // statusUrl = "add"
  public createUser(user: User): void {
    this.messageCreate = '';
    this.messageCreateError = '';
    
    this.userService.setIdUser(this.userSignUp);

    // If form input is valid
    if (this.userSignUp.fullname !== '' && this.userSignUp.username !== '' && this.userSignUp.password !== '') {
      // Check username is exist
      var tempIndex = this.users.findIndex(user => user.username === this.userSignUp.username);
      if (tempIndex >= 0) {
        this.messageCreateError = 'Username is exist';
      } else {
        this.userService.add(this.userSignUp);
        this.messageCreate = "Sign Up Success";
      }
    } else
      // Form input is invalid
      if (this.userSignUp.fullname === '' && this.userSignUp.username === '' && this.userSignUp.password === '') {
        this.messageCreateError = 'Fullname, Username and Password are invalid';
      };

    // Set userSignUp
    this.resetUser();
  }

  
  // Function set statusUrl = "add" when click Cancel
  public changeStatus() {
    this.userService.changeUrl("add");
  }
}
