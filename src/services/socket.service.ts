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

  public sendName(name) {
    this.socket.emit('add-name', name);
  }
  // public playerReady(client) {

  // }

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

  // public startTimer() {
  //   this.socket.emit('start-timer');
  // }

  public getPlayers() {
    let observable = new Observable(observer => {
      this.socket.on('name', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket('disconnect');
      };
    });
    return observable;
  }

  public getTime() {
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