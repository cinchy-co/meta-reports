import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IChartData, IChartFilterContext, IChartShownData, ICombinedChartDataAndMeta} from '../../models/Chart.model';
import {BaseChartDirective} from 'ng2-charts';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  providers: [CurrencyPipe]
})
export class BarComponent implements OnInit {
  @Input() chart: ICombinedChartDataAndMeta;
  @Input() colors: any;
  @Output() chartClickedContext: EventEmitter<IChartFilterContext> = new EventEmitter();
  @ViewChild(BaseChartDirective) chartElem: BaseChartDirective;

  data: IChartData;
  barChartType: string;
  barChartLabels: Array<string>;
  barChartData: Array<IChartShownData>;
  barChartColors;
  chartUrls = [];
  barChartOptions = {
    responsive: true,
    pan: {
      enabled: true,
      mode: 'xy',
    },
    zoom: {
      enabled: true,
      mode: 'xy',
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          color: '#373544'
        },
        ticks: {
          fontColor: '#fff',
          beginAtZero: true,
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
          beginAtZero: true,
          callback(value, index, values) {
            return value;
          }
        },
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
    this.barChartLabels = this.data.chartLabels;
    this.barChartData = this.data.chartData;
    this.chartUrls = this.data.chartUrls;
    this.barChartType = this.camalize(this.data.chartType);
    this.barChartColors = this.colors;
    this.barChartOptions.scales.xAxes[0].stacked = this.chart.isStacked;
    this.barChartOptions.scales.yAxes[0].stacked = this.chart.isStacked;
    this.barChartOptions.zoom.enabled = this.chart.allowZoom;
    this.barChartOptions.pan.enabled = this.chart.allowZoom;
    // tslint:disable-next-line:no-unused-expression
    this.chart.isCurrencyData && this.setCurrencyFormat();
  }

  setCurrencyFormat() {
    const axis = this.data.chartType === 'Bar' ? 'yAxes' : 'xAxes';
    this.barChartOptions.scales[axis][0].ticks.callback = (value, index, values) => {
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
      this.clickedLabel = this.barChartLabels[index];
      this.chartClickedContext.emit({valueForFilter: this.barChartLabels[index], currentChart: this.chart.queryName});
      const url = index && this.chartUrls[index] ? this.chartUrls[index] : null;
      if (url) {
        window.open(url, '_blank');
      }
    }
  }
}
