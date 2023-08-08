import { Component } from '@angular/core';
import { ChatservicesService } from '../services/chatservices.service';
import { Router } from '@angular/router';
import { LogResponse } from '../model/UserResponce.model';
import { catchError, throwError } from 'rxjs';
import { ReqLog } from '../model/User.model';

@Component({
  selector: 'app-log-history',
  templateUrl: './log-history.component.html',
  styleUrls: ['./log-history.component.scss']
})
export class LogHistoryComponent {
  currentUser: string = '';
  logs: LogResponse[] = [];
  startDateTime: number = 0;
  endDateTime: number = 0;
  selectedFromTime: string = new Date().toUTCString();
  selectedToTime: string = new Date().toUTCString();
  logHistory: any = [];
  isdropdownshow = true;

  constructor(private chatService: ChatservicesService, private router: Router) { }
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser') || '';
    const logobj = this.CreaterLogObj();
    this.getLogHistory(logobj);
  }

  getLogHistory(logobj: ReqLog) {    
    debugger;
    this.chatService.getLogs(logobj)
      .pipe(
        catchError(error => {
          console.error('Error fetching logs:', error);
          return throwError('Something went wrong while fetching logs.');
        })
      )
      .subscribe(
        (logRes: LogResponse[]) => {
          debugger;
          this.logs = logRes;
        },
        error => {
          console.error('Error fetching logs:', error);
        }
      );
  }
 
  LogOptionSelect(event: any) {
    const min: number = event.target.value
    if (min != 0) {
      const now = new Date();
      this.selectedFromTime = new Date(now.getTime() - min * 60 * 1000).toUTCString();
      this.selectedToTime = now.toUTCString();
      const logobj = this.CreaterLogObj();
      this.getLogHistory(logobj);
      console.log(logobj);
    }
    else {
      this.isdropdownshow = false;
    }
  }
 
  customLogHistory() {
    const logobj = this.CreaterLogObj();
    this.getLogHistory(logobj);
  }

  CreaterLogObj() {
    const logObj: ReqLog = {
      EndTime: '',
      StartTime: ''
    };
    
    // Convert the DateTime strings to Date objects
    const startTimeDate = new Date(this.selectedFromTime);
    const endTimeDate = new Date(this.selectedToTime);
    
    // Convert Date objects to long values (timestamps in milliseconds)
    const startTimeLong = startTimeDate.getTime();
    const endTimeLong = endTimeDate.getTime();
    
    // Update the logObj with the long values
    logObj.StartTime = startTimeLong/ 1000;;
    logObj.EndTime = endTimeLong/ 1000;
    
    return logObj;
    
  }



}

