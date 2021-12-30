import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @ViewChild('inputPassword')
  inputPassword!: ElementRef;
  @ViewChild('checkButton')
  checkButton!: ElementRef;

  userUrl!: string;
  message!: string;
  // status!: string;
  users!: User[];

  constructor(private userService: UserService) {

  }

  // Get status
  // getStatusFromService(): void {
  //   this.status = this.userService.getStatus();
  // }

  // Get user list: users[]
  getUsersFromService(): void {
    this.users = this.userService.getUsers();
  }

  ngOnInit(): void {
    this.getUsersFromService();
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


  userSignUp: User = {
    id: '',
    fullname: '',
    username: '',
    password: '',
    checkDelete: false
  }
  //
  createUser(user: User): void {
    do {
      var randomId = Math.floor(Math.random() * 1000) + 10;
      var index = this.users.findIndex(user => user.id === String(randomId));
    } while (index >= 0)
    this.userSignUp.id = String(randomId);
    this.users[this.users.length] = this.userSignUp;
    this.userSignUp = {
      id: '',
      fullname: '',
      username: '',
      password: '',
      checkDelete: false
    }
    this.userUrl = "/loginScreen";
    console.log(this.users);
  }

}
