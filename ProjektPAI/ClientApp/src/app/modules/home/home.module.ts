import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HomeComponent } from './page/home.component';
import { CurrencyChartComponent } from './components/currency-chart/currency-chart.component';
import { FilterComponent } from './components/filter/filter.component';
import { HomeRoutingModule } from './home-routing.module';

import { effects, CurrencyReducer } from './state';
import { ChartValuePipe } from './pipe/chart-value.pipe';
import { ChartLabelPipe } from './pipe/chart-label.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    CurrencyChartComponent,
    FilterComponent,
    ChartValuePipe,
    ChartLabelPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatInputModule,
    StoreModule.forFeature(CurrencyReducer.STATE_KEY, CurrencyReducer.reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class HomeModule { }
