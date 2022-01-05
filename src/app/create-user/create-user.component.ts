import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

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

    // reset userForm
    this.resetUser();
  }

}
