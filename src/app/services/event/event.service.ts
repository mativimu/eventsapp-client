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

  public getEvent(id: number, token: string): Observable<any> {
    return this.http
      .get(`${baseUrl}/api/v1/events/id/${id}/${token}`);
  }
    public getEvents(token: string): Observable<any> {
      return this.http
        .get(`${baseUrl}/api/v1/events/all/${token}`);
    }

    public getMyEvents(id: number, token: string) {
      return this.http
        .get(`${baseUrl}/api/v1/events/created/user/${id}/${token}`);
    }

    public getSubscribedEvents(id: number, token: string) {
      return this.http
        .get(`${baseUrl}/api/v1/events/subscribed/user/${id}/${token}`);
    }

    public postEvent(event: NewEvent, id: number, token: String): Observable<any> {
      return this.http
        .post(`${baseUrl}/api/v1/events/add/owner/${id}/${token}`, event);
    }


}
