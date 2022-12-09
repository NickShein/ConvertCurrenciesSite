import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { HttpClientModule } from '@angular/common/http';
import { ConvertationComponent } from './convertation/convertation.component';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRateComponent,
    ConvertationComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
