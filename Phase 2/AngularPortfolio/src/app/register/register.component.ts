import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { UserAccount } from '../UserAccount.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registForm :boolean = false;
  

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  addUser(regisRef: NgForm){
    let register = regisRef.value;
    console.log("Pass = " + register.pass + "\nRepeat pass = " + register.repeatPass);
    let passwordMatch: boolean = (register.pass === register.repeatPass);
    
    
    if (passwordMatch) {

      const tmpUser: UserAccount = {
        username: register.user,
        password: register.pass,
        info: []
      }

      // user does not exist. So register user
      if( !this.userService.users.find(e => e.username == tmpUser.username) ){
        this.userService.addNewUser(tmpUser);
        console.log("Registered successfully!!");
        
      } else { // user already registered.
        alert("User already exist!!")
      }

    } else {
      alert("Password does not match!!");
      return;
    }
  }

  togleForm() {
    this.registForm = !this.registForm;
  }

}
