import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Credentials } from 'src/app/entities/credentials';
import { UserDetails } from 'src/app/entities/userdetails';
import { Message } from 'src/app/entities/message';

import { baseUrl } from 'src/app/services/helper'
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) { }
  
  public authenticate(creds: Credentials): Observable<any> {
    return this.http
      .post(`${baseUrl}/auth`, creds)
    }

}
