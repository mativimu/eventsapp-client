import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../helper';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(
    private http: HttpClient
  ) { }

  public getParticipants(id: number, token: string) {
    return this.http
      .get(`${baseUrl}/api/v1/participants/from-event/${id}/${token}`);
  }

  public deleteParticipant(id: number, token: string) {
    return this.http
      .delete(`${baseUrl}/api/v1/participants/remove/id/${id}/${token}`);
  }

  public addParticipant(eventId: number, userId: number, token: string) {
    console.log(`${baseUrl}/api/v1/participants/add/id/${userId}/status/guest/event/${eventId}/proof/false/${token}`);
    return this.http
      .post(`${baseUrl}/api/v1/participants/add/id/${userId}/status/guest/event/${eventId}/proof/false/${token}`,'');
  }

  public updateAttendance(eventId: number, userId: number, token: string) {
    return this.http
      .put(`${baseUrl}/api/v1/participants/id/${userId}/event/${eventId}/set/proof/${token}`,'');
  }
}