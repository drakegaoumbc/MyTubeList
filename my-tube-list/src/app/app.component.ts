import { Component,OnInit } from '@angular/core';
import { AuthService } from './auth-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'MyTubeList';
  userName: string;
  userPicture: string;
  show:boolean = false;

  isExpanded: boolean = false;
  constructor(public authService: AuthService) {
  }

  toggleCollapse() {
    this.show = !this.show
  }

  public login(): void {
  	this.authService.login();
  }

  public logOut(): void {
  	this.authService.logout();
  }

  ngOnInit() {
  	this.authService.handleAuthentication();
  	if(localStorage.getItem('user_name')) {
  		this.userName = localStorage.getItem('user_name');
  	} else {
  		this.userName = "Nickname";
  	}

  	if(localStorage.getItem('user_picture')) {
  		this.userPicture = localStorage.getItem('user_picture');
  	} else {
  		this.userPicture = "No img";
  	}
  }
}
