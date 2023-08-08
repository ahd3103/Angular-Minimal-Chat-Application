import { Component, OnInit } from '@angular/core';
import { ChatservicesService } from '../services/chatservices.service';
import { User } from '../model/User.model';
import { Message } from '../model/Message.model';
import { Router } from '@angular/router';
import { LogResponse } from '../model/UserResponce.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  messages: Message[] = [];
  chatsMessage: any = [];
  userId: string = '';
  messageText: string = '';
  currentUser: string = '';
  showOptions = false;
  dotContextMenu = false;
  showContextMenu = false;

  logs: LogResponse[] = [];
  startDateTime: number = 0;
  endDateTime: number = 0;

  constructor(private chatService: ChatservicesService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser') || '';
    this.fetchUsers();    
  }

  
 
  fetchUsers() {
    this.chatService.getUserList().subscribe(
      (res) => {
        this.users = res;
        this.getChatHistory(this.users[0]);
      },
      (err) => {
        console.error('Error fetching users:', err);
      }
    );
  }

  refreshUsers() {
    this.fetchUsers();
  }

  getInitials(name: string | undefined): string {
    if (!name) {
      return '';
    }

    const names = name.split(' ');
    if (names.length === 1) {
      return name.charAt(0).toUpperCase();
    } else {
      return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
    }
  }

  getChatHistory(user: any) {
    this.userId = user.userId;
    localStorage.setItem('receiverId', user.userId);
    this.chatService.SharedData.next(user);
    this.chatService.getConversationHistory(user.userId)
      .subscribe(
        (response: Message[]) => {
          this.messages = response;
          this.chatService.MsgHistoryData.next(response);
          this.router.navigate([`user/${this.userId}`]);
          this.chatService.UserName.next(user);
        },
        error => {
          console.error('Error fetching conversation history:', error);
        }
      );
  }
}
