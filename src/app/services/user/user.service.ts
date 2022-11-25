import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../helper';
import { NewUser } from 'src/app/entities/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public addUser(user: NewUser): Observable<any> {
    return this.http
      .post(`${baseUrl}/api/v1/users/new`, user);
  }
}
