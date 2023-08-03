import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../model/Message.model';
import { ChatservicesService } from '../services/chatservices.service';

@Component({
  selector: 'app-conversation-history',
  templateUrl: './conversation-history.component.html',
  styleUrls: ['./conversation-history.component.scss']
})
export class ConversationHistoryComponent implements OnInit {
  userId: string = ''; // Initialize with an empty string
  messages: Message[] = [];
  messageText: string = '';

  constructor(private route: ActivatedRoute, private chatService: ChatservicesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') || '1'; 
      this.getConversationHistory();
    });
  }

  getConversationHistory() {
    this.chatService.getConversationHistory(this.userId)
      .subscribe((response: Message[]) => {
        this.messages = response;
      }, error => {
        console.error('Error fetching conversation history:', error);
      });
  }

  sendMessage() {
    if (this.messageText.trim() === '') return;

    this.chatService.sendMessage(this.userId, this.messageText)
      .subscribe((response) => {
        this.messages.push(response);
        this.messageText = '';
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
