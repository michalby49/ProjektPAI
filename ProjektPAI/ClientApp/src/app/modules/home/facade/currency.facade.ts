import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Currency, CurrencySearchRequest, CurrencyTable } from '../models';
import { CurrencyActions, CurrencySelector, CurrencyTableActions } from '../state';

import { CurrencyState } from '../state/reducers/currency.reducer';

@Injectable()
export class CurrencyFacade {
  get loading$(): Observable<boolean> {
    return this.store.select(CurrencySelector.getLoadingState);
  }

  get currency$(): Observable<Currency> {
    return this.store.select(CurrencySelector.getCurrency);
  }

  get currencySearchQuery$(): Observable<CurrencySearchRequest> {
    return this.store.select(CurrencySelector.getCurrencySearchQuery);
  }

  get currencyTable$(): Observable<CurrencyTable[]> {
    return this.store.select(CurrencySelector.getCurrencyTable);
  }

  constructor(private store: Store<CurrencyState>) {
  }

  loadCurrency(query: CurrencySearchRequest): void {
    this.store.dispatch(CurrencyActions.loadCurrency({query}));
  }

  loadCurrencyTable(): void {
    this.store.dispatch(CurrencyTableActions.loadCurrencyTable());
  }
}
