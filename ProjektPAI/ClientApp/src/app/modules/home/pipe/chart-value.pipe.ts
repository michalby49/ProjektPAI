import { Pipe, PipeTransform } from '@angular/core';
import { Rate } from '../models';

@Pipe({
  name: 'chartValue'
})
export class ChartValuePipe implements PipeTransform {

  transform(rates: Rate[]): number[] {
    return rates.map(a => a.mid);
  }

}
