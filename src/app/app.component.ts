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
  name;
  connection = {
    chat: null,
    timer: null,
    players: null
  };
  messages = [];
  playerList = [];

  timestamp;
  
  constructor( private socketService: SocketService ) {
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';  // just a reset?
  }

  sendName() {
    this.socketService.sendName(this.name);
    this.name = '';  // reset?
  }

  // startLocalTime() {
  //   this.socketService.startTimer();
  // }

  // sendPlayerReady() {
  //   this.socketService.playerReady();
  // }

  ngOnInit() {
    // subscribing to observables in socket.service.ts
    this.connection.chat = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
    this.connection.timer = this.socketService.getTime().subscribe(time => {
      this.timestamp = time;
    });
    this.connection.players = this.socketService.getPlayers().subscribe(player => {
      this.playerList.push(player);
    })
  }

  ngOnDestroy() {
    this.connection.chat.unsubscribe();
    this.connection.timer.unsubscribe();
    this.connection.players.unsubscribe();
  }

}
