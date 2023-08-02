import { Component, OnInit } from '@angular/core';
import { ChatservicesService } from '../services/chatservices.service';
import { User } from '../model/User.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private chatService: ChatservicesService) { }

  ngOnInit(): void {
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

  


}
