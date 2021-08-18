import { Injectable } from '@angular/core';
import { UserInfo } from './UserInfo';
import { UserAccount } from './UserAccount.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  users: Array<UserAccount> = [];

  curUser: string = ""

  getAllUserData(): UserAccount[] {
    return this.users;
  }

  addUserInfo(updateInfo: UserInfo) {
    
    let currentUser = sessionStorage.getItem("currentUser");

    this.users.find(e => {
      if (e.username == currentUser) {
        e.info?.push(updateInfo)
      }
    });
    console.log(this.users);
    
  }

  addNewUser(newUser: UserAccount) {
    // console.log(this.users);
    
    this.users.push(newUser);
  }



}
