import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

////////////////////////////////////////////////////////////////////////////////
import { enviroment } from 'src/enviroments/enviroment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: enviroment.WSurl, options: {} };
////////////////////////////////////////////////////////////////////////////////
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from  '@angular/common/http';
import { EmitComponent } from './component/emit/emit.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    EmitComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
