import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Currency, CurrencySearchRequest, Rate } from '../models/currency.model';
import { DashboardApiService } from '../service/dashboard.service';
import { CurrencyFacade } from '../facade/currency.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CurrencyFacade]
})
export class HomeComponent implements OnInit {

  myControl = new FormControl();

  currencyTable$: Observable<any> = this.currencyFacade.currencyTable$;
  currencyExchangeRates$: Observable<Currency> = this.currencyFacade.currency$;
  currencySerchQuery$: Observable<CurrencySearchRequest> = this.currencyFacade.currencySearchQuery$;

  currencySerchQuery: CurrencySearchRequest = {
    code: '',
    dateFrom: new Date()
  };

  constructor(private currencyFacade: CurrencyFacade) { }

  ngOnInit() {
    this.currencyFacade.loadCurrencyTable();

    this.currencySerchQuery$.subscribe(res => {
      this.currencySerchQuery = JSON.parse(JSON.stringify(res));
    })
  }

  selectedCurrency(currency: Currency): void {
    this.currencyFacade.loadCurrency({ code: currency.code, dateFrom: this.currencySerchQuery.dateFrom });
    this.currencySerchQuery$.subscribe(res => {
      this.currencySerchQuery = JSON.parse(JSON.stringify(res));
    })
  }

  selectedDate(date: Date): void {
    this.currencyFacade.loadCurrency({ code: this.currencySerchQuery.code, dateFrom: date });
    this.currencySerchQuery$.subscribe(res => {
      this.currencySerchQuery = JSON.parse(JSON.stringify(res));
    })
  }
}
