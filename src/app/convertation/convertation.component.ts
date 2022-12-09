import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-convertation',
  templateUrl: './convertation.component.html',
  styleUrls: ['./convertation.component.css']
})
export class ConvertationComponent implements OnInit {
  //select bindings
  selectedOption: string = 'UAH';
  selectedOptionConvert: string = "EUR";
  //input bindings
  selectedCurrentCurrency: number = 0;
  selectedConvertedCurrency: number = 0;

  convertedCurrency: number = 0;
  currentCurrency:number = 0;

  options = [
    { name: "UAH", value: 1 },
    { name: "EUR", value: 2 },
    { name: "USD", value: 3 },
  ]

  //exchange currency values
  uah_eur_currency: number = 0;
  uah_usd_currency:number = 0;
  uah_uah_currency:number = 1;

  //current values
  uaFlagExists: boolean = true;
  euFlagExists: boolean = false;
  usFlagExists: boolean = false;
  //converted values
  uaFlagExistsConverted: boolean = false;
  usFlagExistsConverted: boolean = false;
  euFlagExistsConverted: boolean = true;


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getCurrency('UAH','EUR');
  }

  //function for showing flags near currency
  onEditClick(country:any,mode:string){
    if(mode=='current'){
      if(country=='UAH'){
        this.uaFlagExists = true;
        this.euFlagExists = false;
        this.usFlagExists = false;
      }
      else if(country=='EUR'){
        this.euFlagExists = true;
        this.uaFlagExists = false;
        this.usFlagExists = false;
      }
      else{
        this.usFlagExists = true;
        this.euFlagExists = false;
        this.uaFlagExists = false;
      }
    }
    else{
      if(country=='UAH'){
        this.uaFlagExistsConverted = true;
        this.euFlagExistsConverted = false;
        this.usFlagExistsConverted = false;
      }
      else if(country=='EUR'){
        this.euFlagExistsConverted = true;
        this.uaFlagExistsConverted = false;
        this.usFlagExistsConverted = false;
      }
      else{
        this.usFlagExistsConverted = true;
        this.euFlagExistsConverted = false;
        this.uaFlagExistsConverted = false;
      }
    }
  }

  public restrictNumeric(e:any) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
     return false;
    }
    if (e.which === 0) {
     return true;
    }
    if (e.which < 33) {
      return true;
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
    this.onEditClick(this.selectedOption,'current');
    this.onEditClick(this.selectedOptionConvert,'converted');
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
