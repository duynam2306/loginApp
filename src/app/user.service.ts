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
  public idCurrent = this.idSource.asObservable();

  // Update id for all component
  public changeId(id: string) {
    this.idSource.next(id);
  }

  private usersSource = new BehaviorSubject(listUsers);
  public usersCurrent = this.usersSource.asObservable();

  // Update listUser for all component
  public changeListUser(listUsers: User[]) {
    this.usersSource.next(listUsers);
  }

  private urlSource = new BehaviorSubject('1');
  public urlCurrent = this.urlSource.asObservable();

  // Update statusUrl for all component
  public changeUrl(url: string) {
    this.urlSource.next(url);
  }

  // Create a user
  public add(user: User) {
    // Add a user to listUsers
    listUsers[listUsers.length] = user;
  }


  // Delete a user
  public delete(id: string) {
    // Find index location of deleted user (by id of user is clicked)
    const index = listUsers.findIndex(user => user.id === id);
    // Delete 1 user at index
    listUsers.splice(index, 1);
  }

  // Set a only id for user
  public setIdUser(user: User) {
    // Create unique id
    do {
      // Get random id for user created
      var randomId = Math.floor(Math.random() * 1000) + 10;
      // Find index location of id created, if id is exist then get new id
      var index = listUsers.findIndex(user => user.id === String(randomId));
    } while (index >= 0)
    user.id = String(randomId);
  }

  constructor() { }

}
