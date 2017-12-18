import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'VAMPIRE';
  message: string;
  messages: string[] = [];

  constructor( private socketService: SocketService) {
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';  // just a reset?
  };

  ngOnInit() {
    this.socketService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  };
}
