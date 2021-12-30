import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  @ViewChild('inputPassword')
  inputPassword!: ElementRef;
  @ViewChild('checkButton')
  checkButton!: ElementRef;

  userUrl!: string;
  message!: string;
  // status!: string;
  users!: User[];
  id!: string;
  index!: number;
  messageUpdate!: string;

  constructor(private userService: UserService) {

  }

  // Get user list: users[]
  // getUsersFromService(): void {
  //   this.users = this.userService.getUsers();
  // }

  ngOnInit(): void {
    // this.getUsersFromService();
    this.userService.idCurrent.subscribe(id => this.id = id);
    console.log(this.id);
    this.userService.usersCurrent.subscribe(users => this.users = users);
    this.getUserUpdate();
  }
  userUpdate: User = {
    id: '',
    fullname: '',
    username: '',
    password: '',
    checkDelete: false,
  }

  // Get index of user updated in array
  getIndex(): number {
    this.index = Number(this.id);
    return this.index;
  }
  // this.index = Number(this.id);

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

  updateUser(user: User) {
    this.users[this.getIndex()] = this.userUpdate;
    this.userService.changeListUser(this.users);
    this.messageUpdate = "Updated";
    console.log(this.users);
  }
  
}
