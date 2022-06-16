import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Currency } from '../models/currency.model';




@Injectable({ providedIn: 'root' })
export class DashboardApiService {
    constructor(private http: HttpClient) {
    }

    getCurrencyTable(): Observable<any[]> {
        return this.http.get<any>(`http://api.nbp.pl/api/exchangerates/tables/A/`);
    }

    getCurrencyExchangeRates(currency: string): Observable<Currency[]> {
        return this.http.get<any>(`http://api.nbp.pl/api/exchangerates/rates/A/${currency}/2021-05-17/2022-05-16/`);
    }
}
