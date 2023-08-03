import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { UserModel, UserResponse } from '../model/UserResponce.model';
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

  postUserLogin(user: Login | undefined): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.apiUrl}User/login?email=${user?.email}&password=${user?.password}`, user);
  }

  getUserList(): Observable<User[]> {
    let headers = new HttpHeaders().
    set("Authorization", `bearer ${localStorage.getItem('jwtToken')}`);
    return this.http.get<User[]>(`${this.apiUrl}users`,{headers});
  }

  getConversationHistory(userId: string): Observable<Message[]> {
    const headers = new HttpHeaders().set('Authorization', `bearer ${localStorage.getItem('jwtToken')}`);
    const url = `${this.apiUrl}Message/conversations/${userId}`;
    
    return this.http.get<Message[]>(url, { headers });
  }
  handleError(handleError: any): import("rxjs").OperatorFunction<Message[], any> {
    throw new Error('Method not implemented.');
  }

//  sendMessage(receiverId: string,message:string): Observable<Message>{
//   const headers = new HttpHeaders().set('Authorization', `bearer ${localStorage.getItem('jwtToken')}`);
//   return this.http.post<Message>(`${this.apiUrl}Message/sendMessage`, message,{headers})
//  }

sendMessage(receiver: string, message: string): Observable<Message> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwtToken')}`);
  debugger;
  const url = `${this.apiUrl}Message/sendMessage?receiver=${encodeURIComponent(receiver)}&message=${encodeURIComponent(message)}`;
  return this.http.post<Message>(url, { headers }); 

 
}


 editMessage(messageId: string, message:string): Observable<string>{
  const headers = new HttpHeaders().set('Authorization', `bearer ${localStorage.getItem('jwtToken')}`);
 return this.http.put<string>(`${this.apiUrl}Message/messages/${messageId}`, message,{headers})
 }

 deleteMessage(messageId: string):Observable<string>{
  const headers = new HttpHeaders().set('Authorization', `bearer ${localStorage.getItem('jwtToken')}`);
   return this.http.delete<string>(`${this.apiUrl}Message/messages/${messageId}`,{headers});
  }

}



