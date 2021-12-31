import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';

  public constructor(private titleService: Title){
    this.titleService.setTitle("My Login App"); 
    }

  ngOnInit() {

  }

  status!: boolean;
  changeStatus() {
    this.status = true;
  }
}
