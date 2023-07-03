import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard-component/dashboard-component.component';
import { DeviceIotComponent } from 'src/app/component/device-iot/device-iot.component';

import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    DashboardComponent,
    DeviceIotComponent
  ],
  imports: [
    MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
