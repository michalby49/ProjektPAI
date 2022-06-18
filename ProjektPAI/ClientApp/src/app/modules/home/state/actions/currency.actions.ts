import { createAction, props } from '@ngrx/store';
import { Currency, CurrencySearchRequest } from '../../models';


const LOAD = '[Currency API] Load';
const LOAD_SUCCESS = '[Currency API] Load Success';
const LOAD_FAIL = '[Currency API] Load Fail';

export const loadCurrency = createAction(LOAD, props<{ query: CurrencySearchRequest }>());
export const loadCurrencySuccess = createAction(LOAD_SUCCESS, props<{ item: Currency, query: CurrencySearchRequest}>());
export const loadCurrencyFailure = createAction(LOAD_FAIL, props<{ error: string }>());
