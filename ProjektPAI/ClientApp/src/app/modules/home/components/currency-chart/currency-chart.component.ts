import { Component, Input, OnInit } from '@angular/core';
import {Chart, Filler} from 'chart.js';

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.css']
})
export class CurrencyChartComponent implements OnInit {

  @Input() currencyExchangeRates: any;

  private data: any;

  get effectiveDateList(): any[] {
    return this.currencyExchangeRates.rates.map(a => a.effectiveDate);
  }

  get midRatesList(): number[] {
    return this.currencyExchangeRates.rates.map(a => a.mid);
  }

  constructor() { }

  ngOnInit() {

    Chart.defaults.global.legend.display = false;

    this.data = {
      labels: this.effectiveDateList,
      datasets: [{
        data: this.midRatesList,

        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea, data, scales } = chart;
          if (!chartArea) {
            return null;
          }
          return this.getGradient(ctx, chartArea, data, scales);
        },
        fill: {
          target: {
            value: this.midRatesList[0]
          },
          below: (context) => {
            debugger;
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) {
              return null;
            }
            return this.getGradient(ctx, chartArea, data, scales);
          },
          above: 'green'
        },
        tension: 0,
        // line stroke
        backgroundColor: '#007bff',

        // point
        pointRadius: 0,
        pointHoverRadius: 0,
        pointHitRadius: 10,
      }]
    };

    const myChart = new Chart('myChart', {
      type: 'line',
      data: this.data,
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        hover: {
          intersect: false
        },
        scales: {
          x: {
            type: 'time',
            time: {
              parser: 'dd-MM-yyyy',
              tooltipFormat: 'MM-dd-yyyy',
              unit: 'day',
              displayFormats: {
                day: 'dd-MM-yyyy'
              }
            },
          },
          y: {
            min: 0,
            beginAtZero: true,
            grid: {
              drawBorder: false,
              drawTicks: false
            },
            ticks: {
              padding: 16
            },
          }
        },
      },
    });
  }

  private getGradient(ctx: any, chartArea: any, data: any, scales: any) {
    const { left, right, top, bottom, width, height } = chartArea;
    const x = scales['x-axis-0'];
    const y = scales['y-axis-0'];
    const gredientBorder = ctx.createLinearGradient(0, 0, 0, bottom);
    const shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom;
    gredientBorder.addColorStop(0, '#7CFC00');
    gredientBorder.addColorStop(shift, '#7CFC00');
    gredientBorder.addColorStop(shift, '#FF0000');
    gredientBorder.addColorStop(1, '#FF0000');

    return gredientBorder;
  }
}


