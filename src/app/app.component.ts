import { Component, OnInit, OnDestroy} from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'VAMPIRE';
  message;
  // connection just handles subscribe unsubscribe something
  chatConnection;
  //
  timerConnection;
  messages = [];
  timestamp;
  
  constructor( private socketService: SocketService ) {
    socketService.startTimer();
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';  // just a reset?
  }

  ngOnInit() {
    this.chatConnection = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
    this.timerConnection = this.socketService.getTime().subscribe(time => {
      this.timestamp = time;
    });
  }

  ngOnDestroy() {
    this.chatConnection.unsubscribe();
    this.timerConnection.unsubscribe();
  }

}
