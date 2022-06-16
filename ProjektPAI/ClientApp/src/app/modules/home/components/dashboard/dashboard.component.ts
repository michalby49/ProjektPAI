import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Currency } from '../../models/currency.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myControl = new FormControl();

  constructor() { }

  @Input() currencyTable: any;

  @Output() selectedCurrency = new EventEmitter();

  filteredOptions: Observable<Currency[]>;

  get currencyList(): string[] {
    return this.currencyTable.map(a => a.currency);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  getOptionText(option: Currency): string {
    return option ? option.currency : null;
  }

  selectOption(e: MatAutocompleteSelectedEvent) {
    this.selectedCurrency.emit(e.option.value);
  }

  private _filter(value: string | Currency): Currency[] {
    const filterValue = typeof(value) === 'string' ? value.toLowerCase() : value.currency.toLowerCase();
    return this.currencyTable.filter(option => option.currency.toLowerCase().includes(filterValue));
  }
}
