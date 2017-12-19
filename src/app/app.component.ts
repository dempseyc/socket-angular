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
  connection;
  messages = [];

  constructor( private socketService: SocketService) {
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';  // just a reset?
  }

  ngOnInit() {
    this.connection = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
