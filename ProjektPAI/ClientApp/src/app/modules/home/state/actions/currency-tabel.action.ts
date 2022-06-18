import { createAction, props } from '@ngrx/store';
import { CurrencyTable } from '../../models';


const LOAD = '[Currency Tabel API] Load';
const LOAD_SUCCESS = '[Currency Tabel API] Load Success';
const LOAD_FAIL = '[Currency Tabel API] Load Fail';

export const loadCurrencyTable = createAction(LOAD);
export const loadCurrencyTableSuccess = createAction(LOAD_SUCCESS, props<{ item: CurrencyTable[]}>());
export const loadCurrencyTableFailure = createAction(LOAD_FAIL, props<{ error: string }>());
