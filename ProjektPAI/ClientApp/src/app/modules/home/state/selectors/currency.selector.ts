import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/currency.reducer';

export const getCurrency = createSelector(fromFeature.getCurrencyFeatureState, (state) => state.page);
export const getCurrencySearchQuery = createSelector(fromFeature.getCurrencyFeatureState, (state) => state.query);
export const getError = createSelector(fromFeature.getCurrencyFeatureState, (state) => state.error);
export const getLoadingState = createSelector(fromFeature.getCurrencyFeatureState, (state) => state.loading);
