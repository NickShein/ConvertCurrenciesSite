import { Component } from '@angular/core';
import { ConvertionRates } from './iCurrencyList'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testProject';
  currency_list : ConvertionRates = {};

  getCurrencyList(objectN: ConvertionRates){
    for(let key in objectN){
      this.currency_list[key] = objectN[key];
    }
  }
}
