import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { UserAccount } from '../UserAccount.model';
import { UserInfo } from '../UserInfo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allUsers: Array<UserAccount> = [];

  dashboardForm: boolean = false;

  currUser: UserAccount = {
    username: '',
    password: '',
    info: [],
  };

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  addContact(homeRef: NgForm) {
    let contact = homeRef.value;

    const contInfo: UserInfo = {
      name: contact.contactName,
      phoneNumber: contact.phoneNum,
    };

    // console.log(contInfo);

    this.userService.addUserInfo(contInfo);

    this.allUsers = this.userService.getAllUserData();

    let currentUser = sessionStorage.getItem('currentUser');
    this.allUsers.find((e) => {
      if (e.username == currentUser) {
        this.currUser = e;
      }
    });
    // console.log(this.currUser);
  }

  togleForm() {
    this.dashboardForm = !this.dashboardForm;
  }
}
