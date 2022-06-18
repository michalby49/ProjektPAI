import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Currency, CurrencySearchRequest } from '../models/currency.model';




@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  constructor(private http: HttpClient) {
  }

  getCurrencyTable(): Observable<any[]> {
    return this.http.get<any>(`http://api.nbp.pl/api/exchangerates/tables/A/`);
  }

  getCurrencyExchangeRates(query: CurrencySearchRequest): Observable<Currency> {
    const dateFrom = new Date(query.dateFrom).toISOString().slice(0,10)
    const dateTo = new Date().toISOString().slice(0,10);

    return this.http.get<any>(`http://api.nbp.pl/api/exchangerates/rates/A/${query.code}/${dateFrom}/${dateTo}/`);
  }
}
