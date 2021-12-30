import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './model/user.model';
import { BehaviorSubject } from 'rxjs';
import { listUsers } from './model/listUsers.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' })
}

const apiUrl = 'https://61cada0a194ffe001778899f.mockapi.io/dataUsers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private idSource = new BehaviorSubject('aaa');
  idCurrent = this.idSource.asObservable();

  changeId(id: string) {
    this.idSource.next(id);
  }

  // private usersSource = new BehaviorSubject({
  //   id: '1',
  //   fullname: 'Ali',
  //   username: 'user1',
  //   password: 'password1',
  //   checkDelete: false
  // });
  // usersCurrent = this.usersSource.asObservable();

  // Method return user list
  getUsers(): User[] {
    return listUsers;
  }

  // Method add user to user list
  addUser(user: User): void {
    this.getUsers().push(user);
  }

  constructor() { }

}
