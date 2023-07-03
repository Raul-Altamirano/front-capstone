import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { WeatherIndicatorComponent } from 'src/app/component/weather-indicator/weather-indicator.component';

import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    HomeComponent,
    WeatherIndicatorComponent,
  ],
  imports: [
    MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule,
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
