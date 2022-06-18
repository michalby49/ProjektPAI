import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { DashboardApiService } from '../../service/dashboard.service';
import { CurrencyActions, CurrencyTableActions } from '../actions';
import { CurrencyState } from '../reducers/currency.reducer';
import { getCurrencySearchQuery } from '../selectors/currency.selector';

@Injectable()
export class CurrencyEffects {
  loadCurrency$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrencyActions.loadCurrency),
      withLatestFrom(this.store.select(getCurrencySearchQuery), (action, query) => ({ ...query, ...action.query })),
      switchMap((query) => this.api.getCurrencyExchangeRates(query).pipe(
        map((item) => CurrencyActions.loadCurrencySuccess({ item, query })),
        catchError((error) => of(CurrencyActions.loadCurrencyFailure({ error })))
      )
      )
    );
  });

  loadCurrencyTable$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrencyTableActions.loadCurrencyTable),
      withLatestFrom(this.store.select(getCurrencySearchQuery)),
      switchMap((query) => this.api.getCurrencyTable().pipe(
        map((item) => CurrencyTableActions.loadCurrencyTableSuccess({ item })),
        catchError((error) => of(CurrencyTableActions.loadCurrencyTableFailure({ error })))
      )
      )
    );
  });

  constructor(private actions$: Actions,
    private api: DashboardApiService,
    private store: Store<CurrencyState>) {
  }
}
