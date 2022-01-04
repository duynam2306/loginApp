import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  // listUser
  public users!: User[];
  // Index of user is clicked
  private id!: string;
  // Status of event click
  private statusUrl!: string;

  constructor(private userService: UserService) { 

  }

  ngOnInit(): void {
    this.userService.idCurrent.subscribe(id => this.id = id);
    this.userService.usersCurrent.subscribe(users => this.users = users);
    this.userService.urlCurrent.subscribe(url => this.statusUrl = url);
    console.log(this.users);
  }

  // routeLink to loginScreen
  public checkUrl!: string;

  // Function delete user when Delete is clicked
  public deleteUser(userId: string): void {
    // Find index location of deleted user (by id of user is clicked)
    const index = this.users.findIndex(user => user.id === userId);
    // Delete 1 user at index
    this.users.splice(index, 1);
    // Update listUser
    this.userService.changeListUser(this.users);
    console.log(this.users);
    // When listUser has 1 user, delete user = log out
    if (this.users.length == 1) {
      this.checkUrl = "/loginScreen";
    }
  }

  // Function set status, set id when Update is clicked
  public updateUser(userId: string): void {
    // Find index location of updated user (by id of user is clicked)
    const index = this.users.findIndex(user => user.id === userId);
    // Set statusUrl = "update"
    this.userService.changeUrl("update");
    // Update index of user is clicked
    this.userService.changeId(String(index));
  }

}
