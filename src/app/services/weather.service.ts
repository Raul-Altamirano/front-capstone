import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { WebsocketService } from './websocket.service';
import { map, catchError } from 'rxjs/operators';
import { City } from '../models/city.models';



@Injectable({
  providedIn: 'root'
})
export class WeatherService  {

  // cities:City[]=[]

  constructor(private http: HttpClient, public onEvent: WebsocketService ) {}

  updatTempRoom() {

    return this.onEvent.on('device')

  }

  updatWeatherHour() {

    return this.onEvent.on('message')

  }

  getWeatherForCity(lat: string, lon: string) : Observable<any> {
    const path = `${enviroment.HttpUrl}`;
    
    return this.http.get<any[]>(path,{ observe: 'body', responseType: 'json'})
  }

  // addCity(city:City){
  //   this.cities.push(city);
  // }




}
