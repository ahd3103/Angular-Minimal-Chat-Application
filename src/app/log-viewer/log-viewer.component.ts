
import { Component, OnInit } from '@angular/core';
import { ChatservicesService } from '../services/chatservices.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../model/Message.model';


@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss'],
})
export class LogViewerComponent implements OnInit {
  selectedUserId: any | null;
  messageContent: string = '';
  receivedData: any = [];
  errorMessage = '';
  showOptionsIndex: number = -1;
  userInfo: any;
  ascendingOrder: boolean = true;
  messageLimit: number = 20;
  editedMessageContent: string = '';

  constructor(
    private chatService: ChatservicesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.chatService.MsgHistoryData.subscribe((data: any) => {
      this.receivedData = [];
      let dataList = Object.values(data);
      this.receivedData=dataList;
    });
    // setInterval(() => this.autoSaveData(), 5000);
    this.chatService.UserName.subscribe((user: any) => {
      this.userInfo = user.name;
    });

    this.chatService.getSharedData().subscribe((data: any) => {
      this.selectedUserId = data.userId;
    });

    this.receivedData.map((message: Message) => {
      message.isEditing = false;
    });
  }
// Inside your component class
getMessageClasses(message: any) {
  return {
    'sender': message.senderId === this.selectedUserId,
    'receiver': message.senderId !== this.selectedUserId
  };
}

  sendMessage() {
    const message = {
      receiverId: this.selectedUserId,
      content: this.messageContent
    }

    this.chatService.sendMessage(message).subscribe(
      (response) => {
        this.messageContent = '';
        this.isFetchHistory();
      },
      (error) => {
        console.error('Error sending message:', error);
        this.toastr.error(error);
      }
    );
  }

  onRightClick(event: MouseEvent, index: number) {
    event.preventDefault();
    this.showOptionsIndex = index;
  }

  hideOptions() {
    this.showOptionsIndex = -1;
  }

  editMessage(message: Message) {
    this.editedMessageContent = message.content;
    message.isEditing = true;
    this.hideOptions();
  }

  saveEditedMessage(message: any) {
    message.content = this.editedMessageContent;
    const messages = {
      messageId: message.id,
      content: this.editedMessageContent
    }
    this.chatService.EditMessage(messages).subscribe(
      (response) => {
        message.isEditing = false;
        this.editedMessageContent = '';
        this.toastr.success('Message updated successfully');
      },
      (error: string | undefined) => {
        this.errorMessage = 'Something went wrong';
        this.toastr.error(error);
      }
    );
  }

  cancelEdit(message: Message) {
    message.isEditing = false;
    this.editedMessageContent = '';
  }

  deleteMessage(messageId: string) {
    const confirmDelete = window.confirm('You want to delete this message');
    if (confirmDelete) {
      this.chatService.deleteMessage(messageId).subscribe(
        (response) => {
          this.toastr.success('Message deleted successfully');
          this.isFetchHistory();
        },
        (error) => {
          console.error('Error in message:', error);
          this.toastr.error(error);
        }
      );
    }

    this.hideOptions();
  }

  isFetchHistory() {
    const request = {
      userId: this.selectedUserId,
      sort: this.ascendingOrder ? 'ASC' : 'DESC',
      count: this.messageLimit
    };

    this.chatService.getConversationHistory(this.selectedUserId).subscribe(
      (res: any) => {
        this.receivedData = Object.values(res)[0];
      },
      (error: any) => {
        this.toastr.error(error);
      }
    );
  }

  toggleSortOrder() {
    this.ascendingOrder = !this.ascendingOrder;
    this.isFetchHistory();
  }

  loadMoreMessages() {
    this.messageLimit += 20;
    this.isFetchHistory();
  }
}
