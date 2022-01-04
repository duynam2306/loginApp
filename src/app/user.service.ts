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

  private idSource = new BehaviorSubject('0');
  idCurrent = this.idSource.asObservable();

  // Update id for all component
  changeId(id: string) {
    this.idSource.next(id);
  }

  private usersSource = new BehaviorSubject(
    // {
    // id: '1',
    // fullname: 'Ali',
    // username: 'user1',
    // password: 'password1',
    // checkDelete: false
    // }
    listUsers
  );
  usersCurrent = this.usersSource.asObservable();

  // Update listUser for all component
  changeListUser(listUser: User[]) {
    this.usersSource.next(listUser);
  }

  private urlSource = new BehaviorSubject('1');
  urlCurrent = this.urlSource.asObservable();

  // Update statusUrl for all component
  changeUrl(url: string) {
    this.urlSource.next(url);
  }

  // Method return user list
  // getUsers(): User[] {
  //   return listUsers;
  // }

  constructor() { }

}
