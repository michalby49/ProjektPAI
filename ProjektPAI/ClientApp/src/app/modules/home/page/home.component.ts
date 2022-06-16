import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Currency } from '../models/currency.model';
import { DashboardApiService } from '../service/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myControl = new FormControl();

  currencyTable$: Observable<any> = this.dashboardApiService.getCurrencyTable();
  currencyExchangeRates$: Observable<any> = this.dashboardApiService.getCurrencyExchangeRates('USD');

  constructor(private dashboardApiService: DashboardApiService) { }

  ngOnInit() {
  }

  selectedCurrency(currency: Currency): void {
    this.currencyExchangeRates$ = this.dashboardApiService.getCurrencyExchangeRates(currency.code);
  }
}
