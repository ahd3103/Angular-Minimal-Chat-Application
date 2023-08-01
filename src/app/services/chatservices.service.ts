import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../model/registration.model';

@Injectable({
  providedIn: 'root'
})
export class ChatservicesService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  postAlluser(user: User | undefined): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}register`, user);
  }

  postloginuser(user: User | undefined): Observable<UserResponse>{
    return this.http.post<UserResponse>(`${this.apiUrl}login`, user);
  }

}

