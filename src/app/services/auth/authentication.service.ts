import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Credentials } from 'src/app/entities/credentials';

import { baseUrl } from 'src/app/services/helper'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) { }
  
  public authenticate(creds: Credentials): Observable<any> {
    return this.http
      .post(`${baseUrl}/auth`, creds);
    }

}
