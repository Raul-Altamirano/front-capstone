import { Component, OnInit, Input } from '@angular/core';
import { Device } from 'src/app/models/devices.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponent implements OnInit{
  

  devices: Device[] = [];
  public roomTemp : number = 0;

  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    
    this.weatherService.updatTempRoom().subscribe((msg:any) => {

      console.log(msg)
      this.roomTemp = Number(msg.roomTemp)
      this.devices = this.addDevice(msg.devices)
      console.log(this.devices)
    });

  }


  addDevice(device: any) {
    return this.devices = device.map((val: any) => ({
      name: val.name,
      status:val.status,
      temperature: val.temperature,
      icon: val.icon

    }));
    //  return this.cities.push(city);
  }

}

