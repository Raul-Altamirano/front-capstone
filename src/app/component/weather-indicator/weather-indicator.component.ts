import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { City } from 'src/app/models/city.models';


@Component({
  selector: 'app-weather-indicator',
  templateUrl: './weather-indicator.component.html',
  styleUrls: ['./weather-indicator.component.css']
})


export class WeatherIndicatorComponent implements OnInit {
  cities: City[] = []

  public roomTemp : number = 0;
  public loading: boolean = true;
  public dataWeather: any = [];
  public dateESP: any = {
    days: {
      Mon: 'LUN',
      Tue: 'MAR',
      Wed: 'MIE',
      Thu: 'JUE',
      Fri: 'VIE',
      Sat: 'SAB',
      Sun: 'DOM',
    },
    months: {
      Jan: 'Ene',
      Feb: 'Feb',
      Mar: 'Mar',
      Apr: 'Abr',
      May: 'May',
      Jun: 'Jun',
      Jul: 'Jul',
      Aug: 'Ago',
      Sep: 'Sep',
      Oct: 'Oct',
      Nov: 'Nov',
      Dec: 'Dic',
    },
    dayName: '',
    day: '',
    month: '',
    year:'',

  };

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {


    this.weatherService.updatTempRoom().subscribe((msg:any) => {

      console.log("data event",msg);
      this.roomTemp = Number(msg.roomTemp);
    });

    this.weatherService.getWeatherForCity('19.463897', '-99.246042').subscribe(
      (response) => {
        console.log('∞∞∞∞∞∞∞∞∞∞', this.addCity(JSON.parse(JSON.stringify(response))))
        this.dataWeather = this.addCity(JSON.parse(JSON.stringify(response)))
        console.log(this.dataWeather)
        console.log('dt',this.dataWeather[1].dt)
        
        this.dateESP.dayName = this.dateESP.days[this.dataWeather[1].dt.substring(0,3)]
        this.dateESP.day = this.dataWeather[1].dt.substring(8,11);
        this.dateESP.month = this.dateESP.months[this.dataWeather[1].dt.substring(4,7)]
        this.dateESP.year = this.dataWeather[1].dt.substring(11,15);


      },
      (error) => { console.log(error); });
  }

  addCity(city: any) {
    return this.cities = city.map((val: any) => ({
      dt: this.UnixToJS(val.current.dt).date,
      iconUrl: val.iconUrl,
      description: val.description,
      temp: val.temp,
      feels_like: val.feels_like,
      cityName: val.cityName,
      country: val.country,
      pressure: val.pressure,
      sunrise: this.UnixToJS(val.sunrise).time,
      sunset: this.UnixToJS(val.sunset).time,
      wind_speed: val.wind_speed,
      humidity: val.humidity,
      daily: val.daily

    }));
    //  return this.cities.push(city);
  }


  UnixToJS(unix_timestamp: number) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var fdate = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = fdate.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + fdate.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + fdate.getSeconds();

    // Will display time in 10:30:23 format
    // console.log(formattedTime);
    const date = fdate.toDateString()
    return {
      date,
      time: hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    }


  }

}

