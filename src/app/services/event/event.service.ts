import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  constructor(
    private http: HttpClient,
  ) { }

    public getevents(token: string): Observable<any> {
      return this.http
        .get(`${baseUrl}/api/v1/events/all/${token}`);
    }

}
