import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConvertionRates } from '../iCurrencyList'

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  @Output() CurrencyListExport = new EventEmitter<ConvertionRates>();
  currency_list:ConvertionRates = {}

  uah_eur_currency:number = 0;
  uah_usd_currency:number = 0;

  constructor(private httpClient: HttpClient) {
    this.uah_eur_currency = 0;
  }

  ngOnInit(): void {
    this.getCurrencyList();
    setTimeout(() => { //can be set setInterval for current project if the api wasn`t limited in usage
      this.setForeignCurrencyToUAH();
      this.exportToConvertationComponent();
    }, 200);
  }

  exportToConvertationComponent(){
    this.CurrencyListExport.emit(this.currency_list);
  }

  getCurrencyList(){
    const url = 'https://v6.exchangerate-api.com/v6/fff65443eb2bbaf980aa6fa3/latest/UAH';
    const result_info = this.httpClient.get(url).subscribe((result:any)=>
    {
      for(let key in result.conversion_rates){
        this.currency_list[key] = result.conversion_rates[key];
      }
    });
  }

  setForeignCurrencyToUAH(){
    this.uah_eur_currency = this.currency_list['EUR'];
    this.uah_usd_currency = this.currency_list['USD'];
  }
}
