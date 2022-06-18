import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-currency-chart',
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.scss']
})
export class CurrencyChartComponent implements OnChanges, OnDestroy {

  @Input() rates: number[] = [];
  @Input() date: string[] = [];

  private data: any;
  private chart: any

  get suggestedMin(): number {
    return Math.min(...this.rates);
  }

  get suggestedMax(): number {
    return Math.max(...this.rates) * 1.01;
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }

  createChart(): void {
    this.data = {
      labels: this.date,
      datasets: [{
        data: this.rates,

        borderColor: (context: { chart: any; }) => {
          const chart = context.chart;
          const { ctx, chartArea, data, scales } = chart;
          if (!chartArea) {
            return null;
          }
          return this.getGradient(ctx, chartArea, data, scales);
        },
        fill: {
          target: {
            value: this.rates[0]
          },
          below: (context: { chart: any; }) => {
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) {
              return null;
            }
            return this.getBelowGradient(ctx, chartArea, data, scales);
          },
          above: (context: { chart: any; }) => {
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) {
              return null;
            }
            return this.getAboveGradient(ctx, chartArea, data, scales);
          },
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

    this.chart = new Chart('myChart', {
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
          },
          y: {
            suggestedMin: this.suggestedMin,
            suggestedMax: this.suggestedMax,
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

    Chart.defaults.plugins.legend.display = false;
  }

  private getGradient(ctx: any, chartArea: any, data: any, scales: any) {
    const { left, right, top, bottom, width, height } = chartArea;
    const { x, y } = scales;
    const gredientBorder = ctx.createLinearGradient(0, 0, 0, bottom);
    const shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom;
    gredientBorder.addColorStop(0, 'rgb(0,128,0)');
    gredientBorder.addColorStop(shift, 'rgb(0,128,0)');
    gredientBorder.addColorStop(shift, 'rgb(255,0,0)');
    gredientBorder.addColorStop(1, 'rgb(255,0,0)');

    return gredientBorder;
  }

  private getBelowGradient(ctx: any, chartArea: any, data: any, scales: any) {
    const { left, right, top, bottom, width, height } = chartArea;
    const { x, y } = scales;
    const gredientBackground = ctx.createLinearGradient(0, y.getPixelForValue(data.datasets[0].data[0]), 0, bottom);
    gredientBackground.addColorStop(0, 'rgb(255,0,0,0)')
    gredientBackground.addColorStop(1, 'rgb(255,0,0)')
    return gredientBackground;
  }

  private getAboveGradient(ctx: any, chartArea: any, data: any, scales: any) {
    const { left, right, top, bottom, width, height } = chartArea;
    const { x, y } = scales;
    const gredientBackground = ctx.createLinearGradient(0, y.getPixelForValue(data.datasets[0].data[0]), 0, top);
    gredientBackground.addColorStop(0, 'rgb(0,128,0,0)')
    gredientBackground.addColorStop(1, 'rgb(0,128,0)')
    return gredientBackground;
  }
}


