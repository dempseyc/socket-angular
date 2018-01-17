import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SocketService {
    private url = 'http://localhost:8000';
    private socket;    

    constructor() {
      this.socket = io(this.url);
    }

  public sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  public getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket('disconnect');
      };  
    });     
    return observable;
  }

  public startTimer() {
    this.socket.emit('start-timer');
    let observable = new Observable(observer => {
      this.socket.on('new-time', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket('disconnect');
      };
    });
    return observable;
  }

}