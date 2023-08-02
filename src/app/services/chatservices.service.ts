import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../model/UserResponce.model';
import { Login, User } from '../model/User.model';
import { FormGroup } from '@angular/forms';
import { Message } from '../model/Message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatservicesService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  postUserRegister(user: User | undefined): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}register`, user);
  }

  postUserLogin(user: Login | undefined): Observable<UserResponse>{
    return this.http.post<UserResponse>(`${this.apiUrl}User/login?email=${user?.email}&password=${user?.password}`, user);
  }

  getUserList(): Observable<User[]> {
    let headers = new HttpHeaders().
    set("Authorization", `bearer ${localStorage.getItem('jwtToken')}`);
    return this.http.get<User[]>(`${this.apiUrl}users`,{headers});
  }


  getConversationHistory(userId: string, before: string | null): Observable<{ messages: Message[], before: string | null }> {
    const url = `${this.apiUrl}conversations/${userId}?sort=desc&limit=20${before ? `&before=${before}` : ''}`;
    return this.http.get<{ messages: Message[], before: string | null }>(url);
  }
  
}

