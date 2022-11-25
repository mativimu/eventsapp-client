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

  public getEventParticipants(id: number, token: string) {
    this.http.get(`${baseUrl}/api/v1/participants/from-event/${id}/${token}`);
  }
}