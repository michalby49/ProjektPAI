import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Currency } from '../../models/currency.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  currency = new FormControl();
  date = new FormControl();

  constructor() { }

  @Input() currencyTable: Currency[] = [];

  @Output() selectedCurrency = new EventEmitter();
  @Output() selectedDate = new EventEmitter();

  filteredOptions: Observable<Currency[]> | undefined;

  get currencyList(): string[] {
    return this.currencyTable.map(a => a.currency);
  }

  ngOnInit() {
    this.date.setValue('1M')
    this.filteredOptions = this.currency.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  getOptionText(option: Currency): string {
    return option ? option.currency : '';
  }

  selectOption(e: MatAutocompleteSelectedEvent) {
    this.selectedCurrency.emit(e.option.value);
  }

  selectNewDate() {
    const date = new Date();
    switch (this.date.value) {
      case '1T':
        date.setDate(date.getDate() - 7);
        this.selectedDate.emit(date);
        break;
      case '1M':
        date.setMonth(date.getMonth() - 1);
        this.selectedDate.emit(date);
        break;
      case '3M':
        date.setMonth(date.getMonth() - 3);
        this.selectedDate.emit(date);
        break;
      case '6M':
        date.setMonth(date.getMonth() - 6);
        this.selectedDate.emit(date);
        break;
      case '1R':
        date.setFullYear(date.getFullYear() - 1);
        this.selectedDate.emit(date);
        break;
      default:
        date.setMonth(date.getMonth() - 1);
        this.selectedDate.emit(date);
        break;
    }
  }

  private _filter(value: string | Currency): Currency[] {
    const filterValue = typeof (value) === 'string' ? value.toLowerCase() : value.currency.toLowerCase();
    return this.currencyTable.filter((option: { currency: string; }) => option.currency.toLowerCase().includes(filterValue));
  }

}
