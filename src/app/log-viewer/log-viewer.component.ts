import { Component, OnInit } from '@angular/core';
import { LogResponse } from '../model/UserResponce.model';
import { ChatservicesService } from '../services/chatservices.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss'],
})
export class LogViewerComponent implements OnInit {
  logs: LogResponse[] = [];
  timeframeOptions = [5, 10, 30];
  selectedTimeframe = 5;

  constructor(private chatService: ChatservicesService) {} 

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    const currentTime = Math.floor(Date.now() / 1000);
    const startDateTime = currentTime - this.selectedTimeframe * 60;
    const endDateTime = currentTime;

    this.chatService.getLogs(startDateTime, endDateTime).subscribe(
      (logs) => {
        this.logs = logs;
      },
      (error) => {
        console.error('Error fetching logs:', error);
      }
    );
  }

  onTimeframeSelect(): void {
    this.fetchLogs();
  }
}
