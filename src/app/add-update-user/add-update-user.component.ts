import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ViewChild, ElementRef } from '@angular/core';
import { User } from '../model/user.model';
import { identifierName } from '@angular/compiler';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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

  // listUser
  private users!: User[];
  // id of user was click
  private id!: string;
  // status = "add" 
  public statusUrl!: string;

  form!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.userService.usersCurrent.subscribe(users => this.users = users);
    this.userService.idCurrent.subscribe(id => this.id = id);
    this.userService.urlCurrent.subscribe(url => this.statusUrl = url);
    this.setUserForm();
    console.log(this.userForm)

    this.form = this.formBuilder.group({
      fullname: [this.userForm.fullname, [Validators.maxLength(40), Validators.required]],
      username: [this.userForm.username, [Validators.maxLength(12), Validators.required]],
      password: [this.userForm.password, [Validators.maxLength(10), Validators.required]],
    })
  }

  get fullname() {
    return this.form.get('fullname');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  public userForm: User = {
    id: '',
    fullname: '',
    username: '',
    password: '',
    checkDelete: false,
  }

  // Set user in form
  private setUserForm(): void {
    if (this.statusUrl === 'add') {

    } else if (this.statusUrl === 'update') {
      this.userForm = {
        id: this.users[Number(this.id)].id,
        fullname: this.users[Number(this.id)].fullname,
        username: this.users[Number(this.id)].username,
        password: this.users[Number(this.id)].password,
        checkDelete: false,
      }
    }
  }

  // Reset user
  private resetUser(): void {
    this.userForm = {
      id: '',
      fullname: '',
      username: '',
      password: '',
      checkDelete: false
    }
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

  // message of create box
  public message!: string;
  public messageError!: string;

  // Function update user when Update is clicked in Update box
  // statusUrl = "update"
  public updateUser(user: User) {
    this.message = '';
    
    this.userForm.fullname = this.form.value.fullname;
    this.userForm.password = this.form.value.password;

    // If form input is valid
    if (this.userForm.fullname !== '' && this.userForm.username !== '' && this.userForm.password !== '') {
      // Set user at index = user at update input form
      this.users[Number(this.id)] = this.userForm;
      // Update listUser
      this.userService.changeListUser(this.users);
      // Message
      this.message = "Updated";
    } 

    // status = "add" => reset userForm
    this.changeStatus();
  }

  // statusUrl = "add"
  public createUser(user: User): void {
    this.message = '';
    this.messageError = '';

    this.userForm.fullname = this.form.value.fullname;
    this.userForm.username = this.form.value.username;
    this.userForm.password = this.form.value.password;
    
    this.userService.setIdUser(this.userForm);

    // If form input is valid
    if (this.userForm.fullname !== '' && this.userForm.username !== '' && this.userForm.password !== '') {
      // Check username is exist
      var tempIndex = this.users.findIndex(user => user.username === this.userForm.username);
      if (tempIndex >= 0) {
        this.messageError = 'Username is exist';
      } else {
        this.userService.add(this.userForm);
        this.message = "Sign Up Success";
      }
    } else
      // Form input is invalid
      if (this.userForm.fullname === '' && this.userForm.username === '' && this.userForm.password === '') {
        this.messageError = 'Fullname, Username and Password are invalid';
      };

    // status = "add" => reset userForm
    this.changeStatus();
  }
  
  // Function set statusUrl = "add" when click Cancel
  public changeStatus() {
    this.userService.changeUrl("add");
  }
}
