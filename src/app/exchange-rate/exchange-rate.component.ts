import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  uah_eur_currency:number = 0;
  uah_usd_currency:number = 0;

  constructor(private httpClient: HttpClient) {
    this.uah_eur_currency = 0;
  }

  ngOnInit(): void {
    this.getCurrency();
  }

  getCurrency(){
    const url = 'https://v6.exchangerate-api.com/v6/fff65443eb2bbaf980aa6fa3/latest/UAH';
    const result_info = this.httpClient.get(url).subscribe((result:any)=>
    {
      this.uah_eur_currency = result.conversion_rates.EUR;
      this.uah_usd_currency = result.conversion_rates.USD;
    });
  }
}
