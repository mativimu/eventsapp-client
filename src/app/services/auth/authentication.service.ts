import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Credentials } from 'src/app/entities/credentials';
import { UserDetails } from 'src/app/entities/userdetails';
import { Message } from 'src/app/entities/message';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private undefinedUser: UserDetails = {
    id: undefined, username: undefined,
    email: undefined, password: undefined,
    fullname: undefined, token: undefined
  };
  private userDetails: UserDetails[] = [this.undefinedUser];
  private message: Message[] = [{message: ""}];

  constructor(private http: HttpClient) { }
  
  loadUserDetails(creds: Credentials) {
    this.http
      .post('http://localhost:8080/auth', creds)
      .subscribe(
        okResponse => {
          this.userDetails[0] = okResponse as UserDetails;
          console.log("This is inside of okResponse: " + this.userDetails.length);
        },
        failedResponse => {
          if(failedResponse.error.message === 'User not found') {
            console.log(failedResponse.error.message);
            this.userDetails[0] = this.undefinedUser;
            this.message[0] = {message: "User not found"};
          }
          else if(failedResponse.error.message === 'Invalid Password') {
            console.log(failedResponse.error.message);
            this.userDetails[0] = this.undefinedUser;
            this.message[0] = {message: "Invalid Password"};
          }
          else {
            console.log(failedResponse.error.messsage)
            this.userDetails[0] = this.undefinedUser;
            this.message[0] = {message: "Failed Request"};
          }
        }
      );
    }

  getUserDetail(): UserDetails {
    return this.userDetails[0];
  }

  getMessage(): Message {
    return this.message[0];
  }
}
