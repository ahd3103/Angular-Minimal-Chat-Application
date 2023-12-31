import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError } from 'rxjs';
import { LogResponse, UserModel, UserResponse } from '../model/UserResponce.model';
import { Login, ReqLog, SendMessageRequest, User } from '../model/User.model';
import { FormGroup } from '@angular/forms';
import { Message } from '../model/Message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatservicesService {

  private apiUrl: string = environment.apiUrl;
  SharedData = new Subject<any>();
  MsgHistoryData = new Subject<any>();
  UserName = new Subject<any>();

  constructor(private http: HttpClient) { }

  postUserRegister(user: User | undefined): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, user);
  }

  postUserLogin(user: Login | undefined): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}User/login?email=${user?.email}&password=${user?.password}`, user);
  }

  getUserList(): Observable<User[]> {
    let headers = new HttpHeaders().
      set("Authorization", `bearer ${localStorage.getItem('jwtToken')}`);
    return this.http.get<User[]>(`${this.apiUrl}users`, { headers });
  }

  getConversationHistory(userId: string): Observable<Message[]> {
    const headers = new HttpHeaders().set('Authorization', `bearer ${localStorage.getItem('jwtToken')}`);
    const url = `${this.apiUrl}Message/conversations/${userId}`;
    return this.http.get<Message[]>(url, { headers });
  }
  handleError(handleError: any): import("rxjs").OperatorFunction<Message[], any> {
    throw new Error('Method not implemented.');
  }

  sendMessage(message: any): Observable<Message> {
    const headers = new HttpHeaders().set('Authorization', `bearer ${localStorage.getItem('jwtToken')}`);
    return this.http.post<Message>(`${this.apiUrl}Message/sendMessage`, message, { headers });
  }

  getLogs(logsData: any): Observable<LogResponse[]> {
    let headers = new HttpHeaders()
      .set("Authorization", `bearer ${localStorage.getItem('jwtToken')}`);
    
    return this.http.post<LogResponse[]>(this.apiUrl + 'User/logs', logsData, { headers });
  }
  

//'http://localhost:5276/api/User/GetLogs?startDateTime=123456&endDateTime=1251615651'

EditMessage(message: any): Observable<Message> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtToken')}`);    
    return this.http.put<Message>(`${this.apiUrl}Message/messages`, message, { headers });
  }

  deleteMessage(messageId: string) {
    let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('jwtToken')}`);
    return this.http.delete<any>(`${this.apiUrl}Message/messages/${messageId}`, { headers })
  }

  setSharedData(data: any) {
    this.SharedData.next(data);
  }

  getSharedData() {
    return this.SharedData.asObservable();
  }

}



