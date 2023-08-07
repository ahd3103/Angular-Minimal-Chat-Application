import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError } from 'rxjs';
import { LogResponse, UserModel, UserResponse } from '../model/UserResponce.model';
import { Login, SendMessageRequest, User } from '../model/User.model';
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
    //return this.http.post<Message>(`${this.apiUrl}Message/sendMessage?receiver=${(receiver)}&message=${(message)}`); 
  }

  //  editMessage(messageId: string, message:string): Observable<string>{
  //   const headers = new HttpHeaders().set('Authorization', `bearer ${localStorage.getItem('jwtToken')}`);
  //  return this.http.put<string>(`${this.apiUrl}Message/messages/${messageId}`, message,{headers})
  //  }

  //  deleteMessage(messageId: string):Observable<string>{
  //   const headers = new HttpHeaders().set('Authorization', `bearer ${localStorage.getItem('jwtToken')}`);
  //    return this.http.delete<string>(`${this.apiUrl}Message/messages/${messageId}`,{headers});
  //   }

  //   getLogs(startDateTime: number, endDateTime: number): Observable<LogResponse[]> {
  //     const params = new HttpParams()
  //       .set('startDateTime', startDateTime.toString())
  //       .set('endDateTime', endDateTime.toString());
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtToken')}`);
  //     const options = { params, headers };
  //     return this.http.get<LogResponse[]>(this.apiUrl + 'logs', options);
  //   }
  // sendMessage(request: SendMessageRequest): Observable<any> {
  //   let headers = new HttpHeaders().set("Authorization", `${localStorage.getItem('token')}`);
  //   return this.http.post<any>(`${this.apiUrl}/message`, request, { headers });
  // }

  getMessageHistory(request: any) {
    let headers = new HttpHeaders().set("Authorization", `${localStorage.getItem('token')}`);
    return this.http.post<any>(`${this.apiUrl}/messages`, request, { headers });
  }

  updateMessage(messageId: any, content: any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', `${localStorage.getItem('token')}`);
    let request = { content: content };
    return this.http.put<any>(`${this.apiUrl}/message/${messageId}`, request, { headers });
  }

  deleteMessage(messageId: string) {
    let headers = new HttpHeaders().set("Authorization", `${localStorage.getItem('token')}`);
    return this.http.delete<any>(`${this.apiUrl}/message/${messageId}`, { headers })
  }

  setSharedData(data: any) {
    this.SharedData.next(data);
  }

  getSharedData() {
    return this.SharedData.asObservable();
  }

}



