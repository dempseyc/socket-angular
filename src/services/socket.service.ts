import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    private url = 'http://localhost:8000';
    private socket;    

    constructor() {
        this.socket = io(this.url);
    }

  public sendMessage(message) {
      this.socket.emit('add-message', message);
  };

  public getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }

}