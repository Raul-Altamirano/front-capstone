import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;

  constructor(
    public socket: Socket
  ) {
    this.checkStatus();
  }

  checkStatus() {

    this.socket.on('connect', () => {

      console.log('conectado al servidor')
      this.socketStatus = true;



    })


    this.socket.on('disconnect', () => {

      console.log('DESconectado al servidor')
      this.socketStatus = false;
    })

  }

  emit(evento: string, payload?: any, callback?: Function) {

    this.socket.emit(evento, payload)

  }

  on(evento: string, payload?: any, callback?: Function) {

    // console.log(payload)

    return this.socket.fromEvent(evento);


  }
}
