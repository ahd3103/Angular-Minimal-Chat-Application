import { Component, OnInit } from '@angular/core';
import { ChatservicesService } from '../services/chatservices.service';
import { User } from '../model/User.model';
import { Message } from '../model/Message.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  messages:Message[]=[];
  chatsMessage:any=[];
  userId: string = ''; // Initialize with an empty string 
  messageText: string = '';
  currentUser:string='';
  constructor(private chatService: ChatservicesService) { }

  ngOnInit(): void {
    debugger;
    this.currentUser = localStorage.getItem('currentUser')??'';
    this.fetchUsers();
  }

  fetchUsers() {
    this.chatService.getUserList().subscribe(
      (res) => {
        this.users = res;
      },
      (err) => {
        console.error(err);
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

  getChatHistory(userId:any){
    this.userId = userId;
    this.chatService.getConversationHistory(userId)
    .subscribe((response: Message[]) => {
      debugger;
      this.messages = response;
    }, error => {
      console.error('Error fetching conversation history:', error);
    });
  }
  sendMessage() {
    if (this.messageText.trim() === '') return;
    debugger;    
    this.chatService.sendMessage(this.userId, this.messageText)
      .subscribe((response) => {   
        this.messages.push(response);
        this.messageText = '';
        this.getChatHistory(this.userId);
      }, error => {
        console.error('Error sending message:', error);
      });
  }

  editMessage(messageId: string, newContent: string) {
    this.chatService.editMessage(messageId, newContent)
      .subscribe(() => {
        const editedMessage = this.messages.find(msg => msg.messageId === messageId);
        if (editedMessage) {
          editedMessage.content = newContent;
        }
      }, error => {
        console.error('Error editing message:', error);
      });
  }

  deleteMessage(messageId: string) {
    this.chatService.deleteMessage(messageId)
      .subscribe(() => {
        this.messages = this.messages.filter(msg => msg.messageId !== messageId);
      }, error => {
        console.error('Error deleting message:', error);
      });
  }


}