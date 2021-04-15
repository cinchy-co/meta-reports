import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IChartData, IChartFilterContext, IChartShownData, ICombinedChartDataAndMeta} from '../../models/Chart.model';
import {ChartOptions} from 'chart.js';
import {BaseChartDirective, ThemeService} from 'ng2-charts';
import 'chartjs-plugin-zoom';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
  providers: [CurrencyPipe]
})
export class RadarComponent implements OnInit {
  @Input() chart: ICombinedChartDataAndMeta;
  @Input() colors: any;
  @Output() chartClickedContext: EventEmitter<IChartFilterContext> = new EventEmitter();
  @ViewChild(BaseChartDirective) chartElem: BaseChartDirective;

  data: IChartData;
  radarChartType: string;
  radarChartLabels: Array<string>;
  radarChartData: Array<IChartShownData>;
  radarChartColors;
  chartUrls = [];
  radarChartOptions = {
    responsive: true,
    pan: {
      enabled: true,
      mode: 'xy',
    },
    zoom: {
      enabled: true,
      mode: 'x',
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          color: '#373544'
        },
        ticks: {
          fontColor: '#fff',
          callback(value, index, values) {
            return value;
          }
        }
      }],
      yAxes: [{
        stacked: true,
        gridLines: {
          color: '#373544'
        },
        ticks: {
          fontColor: '#fff',
          callback(value, index, values) {
            return value;
          }
        }
      }]
    },
    legend: {
      position: 'bottom',
      labels: {
        fontColor: '#fff',
        fontSize: 14
      },
      title: {
        fontColor: '#fff'
      }
    },
    onClick: this.chartClicked.bind(this)
  };
  clickedLabel: string;

  constructor(private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.data = this.chart.data;
    this.radarChartLabels = this.data.chartLabels;
    this.radarChartData = this.data.chartData;
    this.chartUrls = this.data.chartUrls;
    this.radarChartType = this.camalize(this.data.chartType);
    this.radarChartColors = this.colors;
    this.radarChartOptions.scales.xAxes[0].stacked = this.chart.isStacked;
    this.radarChartOptions.scales.yAxes[0].stacked = this.chart.isStacked;
    this.radarChartOptions.zoom.enabled = this.chart.allowZoom;
    this.radarChartOptions.pan.enabled = this.chart.allowZoom;
    // tslint:disable-next-line:no-unused-expression
    this.chart.isCurrencyData && this.setCurrencyFormat();
  }

  setCurrencyFormat() {
    this.radarChartOptions.scales.yAxes[0].ticks.callback = (value, index, values) => {
      return this.currencyPipe.transform(value, '$');
    };
  }

  camalize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }

  resetZoom() {
    // @ts-ignore
    this.chartElem.chart.resetZoom();
  }

  resetFilter() {
    this.clickedLabel = null;
    this.chartClickedContext.emit({valueForFilter: 'all', currentChart: this.chart.queryName});
  }

  chartClicked(event, chartElements) {
    if (chartElements && chartElements[0]) {
      const index = chartElements[0]._index;
      this.clickedLabel = this.radarChartLabels[index];
      this.chartClickedContext.emit({valueForFilter: this.radarChartLabels[index], currentChart: this.chart.queryName});
      const url = index && this.chartUrls[index] ? this.chartUrls[index] : null;
      if (url) {
        window.open(url, '_blank');
      }
    }
  }
}
