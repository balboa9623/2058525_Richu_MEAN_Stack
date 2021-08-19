import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';
// import { RegisterComponent as rc } from '../register/register.component';
// import { DashboardComponent as dc } from '../dashboard/dashboard.component';
import { UserService } from '../user.service';

import { UserAccount } from '../UserAccount.model';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm:boolean = true;

  usersData: Array<UserAccount> = [];

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  checkUser(loginRef: NgForm) {
    let login = loginRef.value;
    // console.log(login.user);
    let tmpUser: UserAccount = {
      username: login.user,
      password: login.pass,
      info: []
    };
    this.usersData = this.userService.getAllUserData();
    this.usersData.find(
      (e) => e.username == tmpUser.username && e.password == tmpUser.password
    );
    if (this.usersData.length == 0) {
      alert('Invalid Credentials');
    } else {
      sessionStorage.setItem("currentUser", tmpUser.username);
      // this.userService.setCurrentUser(loginRef.value.user);
      console.log("Login in successfull!!");
      
      // set visibility of home div to true
    }
  }

  setLoginForm(val: boolean) {
    this.loginForm = val;
  }

  togleForm() {
    this.loginForm = !this.loginForm;
  }

}
