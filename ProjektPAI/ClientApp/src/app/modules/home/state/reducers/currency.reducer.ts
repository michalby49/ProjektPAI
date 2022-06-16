import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Currency, CurrencySearchRequest } from '../../models';
import * as AppState from '../../../../core/state/app.state';
import { CurrencyActions } from '../actions';

export const STATE_KEY = 'currency';

export interface CurrencyState {
  page: Currency[];
  query: CurrencySearchRequest;
  error: string;
  loading: boolean;
}

const initialState: CurrencyState = {
  page: null,
  query: null,
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
      page: action.page,
      loading: false,
    };
  }),
  on(CurrencyActions.loadCurrencyFailure, (state, action): CurrencyState => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  })
);

