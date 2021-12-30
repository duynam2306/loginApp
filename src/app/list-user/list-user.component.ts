import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users!: User[];
  id!: string;

  constructor(private userService: UserService) { 

  }

  // Get user list: users[]
  // getUsersFromService(): void {
  //   this.users = this.userService.getUsers();
  // }

  ngOnInit(): void {
    // this.getUsersFromService();
    this.userService.idCurrent.subscribe(id => this.id = id);
    this.userService.usersCurrent.subscribe(users => this.users = users);
    console.log(this.users);
  }

  // Function delete user's account
  deleteUser(userId: string): void {
    // Find index location of deleted user
    const index = this.users.findIndex(user => user.id === userId);
    // Delete 1 user at index
    this.users.splice(index, 1);
    this.userService.changeListUser(this.users);
    console.log(this.users);
  }

  updateUser(userId: string): void {
    const index = this.users.findIndex(user => user.id === userId);
    this.userService.changeId(String(index));
    console.log(index);
  }

}
