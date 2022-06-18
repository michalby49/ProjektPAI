import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/currency.reducer';

export const getCurrency = createSelector(fromFeature.getCurrencyFeatureState, (state) => state.currency);
export const getCurrencySearchQuery = createSelector(fromFeature.getCurrencyFeatureState, (state) => state.currencyQuery);

export const getCurrencyTable = createSelector(fromFeature.getCurrencyFeatureState, (state) => state.currencyTable);

export const getError = createSelector(fromFeature.getCurrencyFeatureState, (state) => state.error);
export const getLoadingState = createSelector(fromFeature.getCurrencyFeatureState, (state) => state.loading);

