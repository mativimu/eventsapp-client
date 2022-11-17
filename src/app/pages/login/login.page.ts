import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/entities/credentials';
import { UserDetails } from 'src/app/entities/userdetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public token: any;
  public userInfo: any;

  constructor(private http: HttpClient) {
  }

  loadUserCredentials() {
    let creds: Credentials = {email: "becca@edgemail.com", password: "B3CC4"};
    let userCredentials: UserDetails;
    this.http
      .post('http://localhost:8080/auth', creds)
      .subscribe(
        response => {
          userCredentials = response as UserDetails;
          this.token = userCredentials.token;
          this.userInfo = userCredentials;
          console.log(this.userInfo)
        },
        response => {
          if(response.error.message === 'User not found') {
            console.log("Incorrect Email");
            alert("Incorrect Email")
          }
          else if(response.error.message === 'Incorrect Password') {
            console.log("Incorrect password, please enter a valid one.");
            alert("Incorrect password, please enter a valid one.")
          }
        }
      );
  }
  
}

