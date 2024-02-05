import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Data, Friend } from '../interfaces';
import { joinUrlSegments } from '../helpers';
import { environment } from '../../environments';

@Injectable()
export class MyFriendsService {
  private url = joinUrlSegments(environment.API_URL, 'my-friends');

  constructor(private socket: Socket, private httpClient: HttpClient) {}

  
  /**
   * The function returns an Observable that emits Data objects when a specific event occurs on a
   * socket connection.
   * @param {string} eventName - The eventName parameter is a string that represents the name of the
   * event that you want to listen to on the socket connection.
   * @returns an Observable of type Data.
   */
  public getNewMessage(eventName: string): Observable<Data> {
    return this.socket.fromEvent<Data>(eventName);
  }

  /**
   * The function returns an Observable that emits an array of Friend objects obtained from an HTTP GET
   * request to a specified URL.
   * @returns An Observable of type Friend[] is being returned.
   */
  public getFriends(): Observable<Friend[]> {
    return this.httpClient.get<Friend[]>(this.url);
  }
}
