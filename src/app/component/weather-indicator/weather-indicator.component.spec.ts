import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherIndicatorComponent } from './weather-indicator.component';

describe('WeatherIndicatorComponent', () => {
  let component: WeatherIndicatorComponent;
  let fixture: ComponentFixture<WeatherIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherIndicatorComponent]
    });
    fixture = TestBed.createComponent(WeatherIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test_room_temp_updates_successfully', () => {
    const weatherIndicatorComponent = new WeatherIndicatorComponent(new WeatherService(new HttpClient(), new WebsocketService()));
    const mockData = { roomTemp: 25 };
    weatherIndicatorComponent.weatherService.onEvent.emit('device', mockData);
    expect(weatherIndicatorComponent.roomTemp).toEqual(25);
});
it('test_weather_data_retrieved_successfully', () => {
  const weatherIndicatorComponent = new WeatherIndicatorComponent(new WeatherService(new HttpClient(), new WebsocketService()));
  const spy = spyOn(weatherIndicatorComponent.weatherService, 'getWeatherForCity').and.returnValue(of({}));
  weatherIndicatorComponent.ngOnInit();
  expect(spy).toHaveBeenCalled();
});

});
