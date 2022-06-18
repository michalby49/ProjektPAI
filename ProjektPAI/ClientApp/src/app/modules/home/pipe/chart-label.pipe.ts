import { Pipe, PipeTransform } from '@angular/core';
import { Rate } from '../models';

@Pipe({
  name: 'chartLabel'
})
export class ChartLabelPipe implements PipeTransform {

  transform(rates: Rate[]): string[] {
    return rates.map(a => a.effectiveDate);
  }

}
