import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../helper';
import { Observable } from 'rxjs';
import { NewEvent } from 'src/app/entities/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  constructor(
    private http: HttpClient,
  ) { }

    public getEvents(token: string): Observable<any> {
      return this.http
        .get(`${baseUrl}/api/v1/events/all/${token}`);
    }

    public postEvent(event: NewEvent, id: number, token: String): Observable<any> {
      return this.http
        .post(`${baseUrl}/api/v1/events/add/owner/${id}/${token}`, event);
    }

}
