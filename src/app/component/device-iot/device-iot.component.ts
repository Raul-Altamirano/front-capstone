import { Component, OnInit, Input } from '@angular/core';
import { Device } from 'src/app/models/devices.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-device-iot',
  templateUrl: './device-iot.component.html',
  styleUrls: ['./device-iot.component.css']
})
export class DeviceIotComponent {
  @Input() device?:any

}
