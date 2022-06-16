import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Currency, CurrencySearchRequest } from '../models';
import { CurrencyActions, CurrencySelector } from '../state';

import { CurrencyState } from '../state/reducers/currency.reducer';

@Injectable()
export class CurrencyFacade {
  get loading$(): Observable<boolean> {
    return this.store.select(CurrencySelector.getLoadingState);
  }

  get all$(): Observable<Currency> {
    return this.store.select(CurrencySelector.getCurrency);
  }

  constructor(private store: Store<CurrencyState>) {
  }

  load(query: CurrencySearchRequest): void {
    this.store.dispatch(CurrencyActions.loadCurrency({query}));
  }
}
