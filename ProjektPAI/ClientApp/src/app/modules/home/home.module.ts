import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './page/home.component';
import { CurrencyChartComponent } from './components/currency-chart/currency-chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    HomeComponent,
    CurrencyChartComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
  ]
})
export class HomeModule { }
