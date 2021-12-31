import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ViewChild, ElementRef } from '@angular/core';
import { User } from '../model/user.model';

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

  // routeLink to listUserComponent
  userUrl!: string;
  // message of create box
  messageCreate!: string;
  messageCreateError!: string;
  // listUser
  users!: User[];
  // id of user was click
  id!: string;
  // status = "add"
  statusUrl!: string;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.usersCurrent.subscribe(users => this.users = users);
    this.userService.idCurrent.subscribe(id => this.id = id);
    this.userService.urlCurrent.subscribe(url => this.statusUrl = url);
    this.getIndex();
    this.getUserUpdate();
  }

  showPassword(e: any) {
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

  // New user = user at signup input form
  userSignUp: User = {
    id: '',
    fullname: '',
    username: '',
    password: '',
    checkDelete: false
  }
  
  // statusUrl = "add"
  createUser(user: User): void {
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

    this.userSignUp = {
      id: '',
      fullname: '',
      username: '',
      password: '',
      checkDelete: false
    };
    // routing to listUserComponent
    this.userUrl = "/listUser";
  }

  // Index of user is clicked
  index!: number;

  // Get index of user updated 
  getIndex(): number {
    this.index = Number(this.id);
    return this.index;
  }

  // New user = user at index
  userUpdate: User = {
    id: '',
    fullname: '',
    username: '',
    password: '',
    checkDelete: false,
  }

  // Get user need to be updated
  getUserUpdate(): void {
    this.userUpdate = {
      id: this.users[this.getIndex()].id,
      fullname: this.users[this.getIndex()].fullname,
      username: this.users[this.getIndex()].username,
      password: this.users[this.getIndex()].password,
      checkDelete: false,
    }
  }

  // Message of update box
  messageUpdate!: string;
  messageUpdateError!: string;

  // Function update user when Update is clicked in Update box
  // statusUrl = "update"
  updateUser(user: User) {
    this.messageUpdate = '';
    // If form input is valid
    if (this.userUpdate.fullname !== '' && this.userUpdate.username !== '' && this.userUpdate.password !== '') {
      // Set user at index = user at update input form
      this.users[this.getIndex()] = this.userUpdate;
      // Update listUser
      this.userService.changeListUser(this.users);
      // Message
      this.messageUpdate = "Updated";
    } 
  }

  // Function set statusUrl = "add" when click Cancel
  changeStatus() {
    this.userService.changeUrl("add");
  }
}
