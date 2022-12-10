import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConvertionRates } from '../iCurrencyList';

interface ArrayOfObjects{
  name:string,
  value:number
}

@Component({
  selector: 'app-convertation',
  templateUrl: './convertation.component.html',
  styleUrls: ['./convertation.component.css']
})
export class ConvertationComponent implements OnInit {
  @Input() currency_list: ConvertionRates = {};
  //select bindings
  selectedOption: string = 'UAH';
  selectedOptionConvert: string = "EUR";
  //input bindings
  selectedCurrentCurrency: number = 0;
  selectedConvertedCurrency: number = 0;

  convertedCurrency: number = 0;
  currentCurrency:number = 0;

  options:ArrayOfObjects[] = [];

  //exchange currency values
  uah_eur_currency: number = 0;
  uah_usd_currency:number = 0;
  uah_uah_currency:number = 1;



  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getCurrency('UAH','EUR');
    setTimeout(() => {
      this.generateSelectOptions();
    }, 200);
  }

  generateSelectOptions(){
    let index = 1;
    console.log(this.currency_list);
    for(const key in this.currency_list){
      console.log(key, this.currency_list[key])
      this.options.push({name:key,value:index});
      index=index+1;
    }
    this.selectedOptionConvert = "EUR";
  }

  restrictNumeric(e:KeyboardEvent) {
    let input;
    if (e.metaKey || e.ctrlKey || e.key == '.') {
      return true;
    }
    for(let i = 0;i<10;i=i+1){
      if(e.key == '' + i){
        return true;
      }
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
   }

  getCurrency(convertFrom:string, convertTo:string, mode:string='current'){
    let result_function:number = 0;
    const url = `https://v6.exchangerate-api.com/v6/fff65443eb2bbaf980aa6fa3/latest/${convertFrom}`;
    const result_info = this.httpClient.get(url).subscribe((result:any)=>
    {
      if(mode=='current'){
        this.convertedCurrency = +result.conversion_rates[convertTo];
      }
      else{
        this.currentCurrency = +result.conversion_rates[convertTo];
      }
    });
  }

  changeCurrencies(){
    let tempCurrency = this.selectedOption;
    this.selectedOption = this.selectedOptionConvert;
    this.selectedOptionConvert = tempCurrency;
    this.getCurrency(this.selectedOption,this.selectedOptionConvert);
    setTimeout(() => {
      this.convertMoney('fromTo');
    }, 1000);
  }

  convertMoney(mode:string){
    if(mode=='fromTo'){
      this.getCurrency(this.selectedOption, this.selectedOptionConvert);
      this.selectedConvertedCurrency = +this.selectedCurrentCurrency * +this.convertedCurrency;
    }
    else{
      this.getCurrency(this.selectedOptionConvert, this.selectedOption, 'converted')
      this.selectedCurrentCurrency = +this.selectedConvertedCurrency * +this.currentCurrency;
    }
  }
}
