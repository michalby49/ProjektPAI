import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Currency, CurrencySearchRequest, CurrencyTable } from '../../models';
import { CurrencyActions, CurrencyTableActions } from '../actions';
import * as AppState from '../../../../core/state/app.state';

export const STATE_KEY = 'currency';

export interface CurrencyState {
  currency: Currency;
  currencyQuery: CurrencySearchRequest;
  currencyTable: CurrencyTable[];
  error: string;
  loading: boolean;
}


const initialState: CurrencyState = {
  currency: null as any,
  currencyQuery: {
    code: 'USD',
    dateFrom: new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
    )
  },
  currencyTable: null as any,
  error: '',
  loading: true,
};

export interface State extends AppState.State {
  promotions: CurrencyState;
}

export const getCurrencyFeatureState = createFeatureSelector<CurrencyState>(STATE_KEY);

export const reducers = createReducer<CurrencyState>(
  initialState,
  on(CurrencyActions.loadCurrencySuccess, (state, action): CurrencyState => {
    return {
      ...state,
      currency: action.item,
      currencyQuery: action.query,
      loading: false,
    };
  }),
  on(CurrencyActions.loadCurrencyFailure, (state, action): CurrencyState => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),

  on(CurrencyTableActions.loadCurrencyTableSuccess, (state, action): CurrencyState => {
    return {
      ...state,
      currencyTable: action.item,
      loading: false,
    };
  }),
  on(CurrencyTableActions.loadCurrencyTableFailure, (state, action): CurrencyState => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  })
);

